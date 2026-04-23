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

@app.get("/doctors/{doctor_id}", response_model=schemas.DoctorResponse)
def get_doctor_by_id(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor

@app.get("/doctors/{doctor_id}/slots")
def get_available_slots(
        doctor_id: int,
        booking_date: date,
        mode: str = Query("online", regex="^(online|offline)$"),
        requested_duration: int = Query(20),  # User can now pass 50, 60, etc.
        db: Session = Depends(get_db)
):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # 1. Determine actual duration (User choice vs Mode Minimum)
    # If it's offline, we might want a minimum of 40 even if they ask for 20
    actual_duration = max(requested_duration, 40 if mode == "offline" else 20)

    # 2. Setup Windows (Using Doctor's DB hours)
    h_start, m_start = map(int, doctor.start_time.split(':'))
    h_end, m_end = map(int, doctor.end_time.split(':'))
    day_start = datetime.combine(booking_date, datetime.min.time()).replace(hour=h_start, minute=m_start)
    day_end = datetime.combine(booking_date, datetime.min.time()).replace(hour=h_end, minute=m_end)

    # 3. Get Booked Slots
    booked = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == doctor_id,
        models.Appointment.status == models.ApptStatus.BOOKED,
        models.Appointment.appointment_time >= day_start,
        models.Appointment.appointment_time < day_end
    ).all()
    booked_times = [appt.appointment_time.replace(tzinfo=None, second=0, microsecond=0) for appt in booked]

    # 4. The "Sliding Window" Check
    available_slots = []
    current = day_start

    while current + timedelta(minutes=actual_duration) <= day_end:
        # Check if EVERY 20-minute block within the requested duration is free
        is_fully_free = True
        for offset in range(0, actual_duration, 20):
            check_point = current + timedelta(minutes=offset)
            if check_point in booked_times:
                is_fully_free = False
                break

        if is_fully_free:
            slot_time = current.strftime("%H:%M")
            check_in = (current - timedelta(minutes=15)).strftime("%H:%M") if mode == "offline" else None

            available_slots.append({
                "time": slot_time,
                "check_in": check_in,
                "duration": actual_duration,
                "label": f"{slot_time} ({actual_duration} mins)"
            })

        # Move to the next 20-minute start point
        current += timedelta(minutes=20)

    return {
        "doctor_id": doctor_id,
        "mode": mode,
        "requested_duration": actual_duration,
        "slots": available_slots
    }