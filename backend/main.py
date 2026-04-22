from fastapi import FastAPI, Depends, HTTPException, Query
import models
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from sqlalchemy.orm import Session
from datetime import date, datetime, timedelta
from typing import Optional, List
import schemas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="InstantMD API")
origins = [
    "http://localhost:5173",  # Vite / React's modern default port
    "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

@app.get("/")
def root():
    return {"status": "InstantMD Backend is Online"}

@app.get("/doctors", response_model=List[schemas.DoctorResponse])
def get_doctors(specialty: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Doctor)
    if specialty:
        query = query.filter(models.Doctor.specialization.ilike(f"%{specialty}%"))
    return query.all()

@app.post("/doctors", response_model=schemas.DoctorResponse)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    new_doctor = models.Doctor(**doctor.dict())
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor

@app.post("/appointments", response_model=schemas.AppointmentResponse)
def book_appointment(appt: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    # Standardize time to avoid timezone/second mismatches
    standard_time = appt.appointment_time.replace(tzinfo=None, second=0, microsecond=0)

    # 1. Doctor Verification
    doctor = db.query(models.Doctor).filter(models.Doctor.id == appt.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # 2. Conflict Check (Using the Enum class)
    existing = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == appt.doctor_id,
        models.Appointment.appointment_time == standard_time,
        models.Appointment.status == models.ApptStatus.BOOKED # <--- Enum Reference
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Slot already taken.")

    # 3. Save Appointment
    new_appt = models.Appointment(
        doctor_id=appt.doctor_id,
        patient_id=appt.patient_id,
        appointment_time=standard_time,
        type=appt.type,
        status=models.ApptStatus.BOOKED # <--- Enum Reference
    )

    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)
    return new_appt


@app.get("/appointments/me", response_model=list[dict])
def get_my_detailed_appointments(patient_id: str, db: Session = Depends(get_db)):
    # This JOIN gets the doctor info alongside the appointment info
    results = db.query(models.Appointment, models.Doctor). \
        join(models.Doctor, models.Appointment.doctor_id == models.Doctor.id). \
        filter(models.Appointment.patient_id == patient_id).all()

    # Format the data for your "Detailed Report" page
    report = []
    for appt, doc in results:
        report.append({
            "appointment_id": appt.id,
            "time": appt.appointment_time,
            "status": appt.status,
            "type": appt.type,
            "doctor_name": doc.name,
            "specialization": doc.specialization,
            "hospital": doc.hospital_name,
            "address": doc.address,
            "fees": doc.fees
        })
    return report


@app.get("/doctors/{doctor_id}/slots")
def get_available_slots(
        doctor_id: int,
        booking_date: date,
        duration: int = 20,  # Dynamic duration (minimum 20)
        db: Session = Depends(get_db)
):
    if duration < 20:
        raise HTTPException(status_code=400, detail="Minimum duration is 20 minutes.")

    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # 1. Generate ALL possible 20-minute start points
    all_possible_starts = []
    start_time = datetime.combine(booking_date, datetime.min.time()).replace(hour=9)
    end_time = datetime.combine(booking_date, datetime.min.time()).replace(hour=17)

    current = start_time
    while current <= end_time:
        all_possible_starts.append(current)
        current += timedelta(minutes=20)

    # 2. Get currently booked appointments
    booked_appointments = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == doctor_id,
        models.Appointment.status == models.ApptStatus.BOOKED,
        models.Appointment.appointment_time >= datetime.combine(booking_date, datetime.min.time()),
        models.Appointment.appointment_time < datetime.combine(booking_date, datetime.max.time())
    ).all()

    booked_times = [appt.appointment_time.replace(tzinfo=None, second=0, microsecond=0) for appt in booked_appointments]

    # 3. Filter starts: A start point is valid only if the FULL duration is free
    available_slots = []
    for start in all_possible_starts:
        # Check if any 20-min block within the 'duration' is already booked
        is_free = True
        for i in range(0, duration, 20):
            check_time = start + timedelta(minutes=i)
            if check_time in booked_times or check_time > end_time:
                is_free = False
                break

        if is_free:
            available_slots.append(start.strftime("%H:%M"))

    return {
        "doctor_id": doctor_id,
        "date": booking_date,
        "duration_minutes": duration,
        "available_slots": available_slots
    }