from fastapi import FastAPI, Depends, HTTPException, Query,BackgroundTasks
import models
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import date, datetime, timedelta
from typing import Optional, List
import schemas
import time
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
models.Base.metadata.create_all(bind=engine)

load_dotenv()
MAIL_PASSWORD=os.getenv("MAIL_PASSWORD")

app = FastAPI(title="InstantMD API")
origins = [
    "http://localhost:5173",  # Vite / React's modern default port
    "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Your React URL
    allow_credentials=True,
    allow_methods=["*"], # Allows GET, POST, PATCH, DELETE, etc.
    allow_headers=["*"], # Allows all headers
)

conf = ConnectionConfig(
    MAIL_USERNAME="tendersoftdefective@gmail.com",
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM="tendersoftdefective@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
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
    actual_duration = max(requested_duration, 30 if mode == "offline" else 15)
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
        for offset in range(0, actual_duration, 15):
            check_point = current + timedelta(minutes=offset)
            if check_point in booked_times:
                is_fully_free = False
                break

        if is_fully_free:
            slot_time = current.strftime("%H:%M")

            # 🟢 THE OFFLINE LOGIC:
            # If offline, suggest arriving 15 minutes early
            check_in = None
            if mode == "offline":
                check_in = (current - timedelta(minutes=15)).strftime("%H:%M")

            available_slots.append({
                "time": slot_time,
                "check_in": check_in,
                "duration": actual_duration,
                "label": f"{slot_time} (In-Person)" if mode == "offline" else f"{slot_time} (Online)"
            })

        # Move to the next 20-minute start point
        current += timedelta(minutes=15)

    return {
        "doctor_id": doctor_id,
        "mode": mode,
        "requested_duration": actual_duration,
        "slots": available_slots
    }


@app.post("/bookings/create-intent")
async def create_intent(intent: schemas.BookingIntent, db: Session = Depends(get_db)):
    print(f"DEBUG: Received intent mode: {intent.mode}")
    doctor = db.query(models.Doctor).filter(models.Doctor.id == intent.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    slot_datetime = datetime.combine(
        datetime.strptime(intent.date, "%Y-%m-%d").date(),
        datetime.strptime(intent.slot, "%H:%M").time()
    )

    # 2. Check if it's already locked by someone else
    # (Checking for locks created in the last 10 minutes)
    ten_minutes_ago = datetime.utcnow() - timedelta(minutes=10)
    is_locked = db.query(models.PendingBooking).filter(
        models.PendingBooking.doctor_id == intent.doctor_id,
        models.PendingBooking.slot_time == slot_datetime,
        models.PendingBooking.created_at > ten_minutes_ago
    ).first()

    if is_locked:
        raise HTTPException(status_code=400, detail="This slot is currently being held for payment.")

    # 3. Create the Lock
    order_id = f"DUMMY_{int(time.time())}"
    new_lock = models.PendingBooking(
        doctor_id=intent.doctor_id,
        slot_time=slot_datetime,
        order_id=order_id,
        type=intent.mode
    )
    db.add(new_lock)
    db.commit()

    # 4. Return info to Frontend
    base_fee = doctor.fees
    multipliers = {15: 1.0, 30: 1.5, 45: 2.0, 60: 2.5}
    total_amount = base_fee * multipliers.get(intent.duration, 1.0)

    return {
        "order_id": order_id,
        "amount": total_amount,
        "doctor_name": doctor.name,
        "status": "locked"
    }


@app.post("/bookings/confirm")
async def confirm_booking(payload: dict, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    order_id = payload.get("order_id")
    patient_id = payload.get("patient_id")
    email = payload.get("email") # 🟢 Ensure React sends this!

    lock = db.query(models.PendingBooking).filter(models.PendingBooking.order_id == order_id).first()
    if not lock:
        raise HTTPException(status_code=400, detail="Expired or processed.")

    doc = db.query(models.Doctor).filter(models.Doctor.id == lock.doctor_id).first()

    new_appt = models.Appointment(
        doctor_id=lock.doctor_id,
        patient_id=patient_id,
        appointment_time=lock.slot_time,
        type=lock.type if lock.type else "offline",
        status=models.ApptStatus.BOOKED
    )

    db.add(new_appt)
    db.delete(lock)
    db.commit()

    background_tasks.add_task(
        send_appointment_email,
        email=email,
        doctor_name=doc.name,
        address=doc.address,
        appointment_time=new_appt.appointment_time.strftime("%d %b, %I:%M %p"),
        mode=new_appt.type,
        is_cancellation=False
    )

    return {"status": "success"}


@app.get("/appointments/me")
def get_my_detailed_appointments(patient_id: str, db: Session = Depends(get_db)):
    # This JOIN fetches data from both the Appointment and Doctor tables
    results = db.query(models.Appointment, models.Doctor). \
        join(models.Doctor, models.Appointment.doctor_id == models.Doctor.id). \
        filter(models.Appointment.patient_id == patient_id). \
        order_by(desc(models.Appointment.id)).all()

    report = []
    for appt, doc in results:
        report.append({
            "id": appt.id,  # React uses this for cancelling
            "doctor_id": doc.id,  # 🟢 ADD THIS LINE RIGHT HERE
            "doctor_name": doc.name,
            "time": appt.appointment_time,
            "status": appt.status.value if hasattr(appt.status, 'value') else appt.status,
            "type": appt.type,
            "specialization": doc.specialization,
            "hospital": doc.hospital_name,
            "address": doc.address,
            "fees": doc.fees
        })
    return report


async def send_appointment_email(
        email: str,
        doctor_name: str,
        address: str,
        appointment_time: str,
        mode: str,
        is_cancellation: bool = False
):
    print(
        f"DEBUG: Attempting to send email to {email} via tendersoftdefective@gmail.com...")  # 🟢 Check terminal for this
    # Dynamic content based on status
    subject = "InstantMD: Cancellation Confirmed" if is_cancellation else "InstantMD: Appointment Confirmed"
    status_text = "Appointment Cancelled" if is_cancellation else "Appointment Confirmed"
    status_color = "#e11d48" if is_cancellation else "#10b981"

    if is_cancellation:
        # NO virtual session or video link info for cancellations
        location_html = f"""
                <p style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">{appointment_time}</p>
                <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b;">This slot has been released.</p>
            """
    else:
        # Standard booking logic
        if mode.lower() == "online":
            location_html = f"""
                    <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 800; color: #6366f1; text-transform: uppercase;">Virtual Session</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">{appointment_time}</p>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b;">🎥 Video link will be sent 5 mins before start.</p>
                """
        else:
            location_html = f"""
                    <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">In-Person Visit</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">{appointment_time}</p>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b;">📍 {address}</p>
                """

    # Cancel Button HTML (Only for bookings)
    cancel_button = "" if is_cancellation else f"""
        <div style="margin-top: 30px; text-align: center;">
            <a href="http://localhost:5173/history" 
               style="background-color: #0f172a; color: white; padding: 12px 25px; border-radius: 12px; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
               Manage or Cancel Slot
            </a>
        </div>
    """

    html = f"""
        <div style="font-family: 'Inter', sans-serif; max-width: 500px; margin: auto; border: 1px solid #f1f5f9; border-radius: 24px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 25px; text-align: center;">
                <h1 style="color: #10b981; margin: 0; font-size: 24px; font-weight: 900;">Instant<span style="color: white;">MD</span></h1>
            </div>
            <div style="padding: 40px; background-color: white;">
                <h2 style="color: {status_color}; font-size: 18px; font-weight: 800; text-transform: uppercase;">{status_text}</h2>
                <p style="font-size: 14px; color: #475569;">Consultation with <strong>{doctor_name}</strong>:</p>

                <div style="background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; margin: 20px 0;">
                    {location_html}
                </div>

                {cancel_button}
                <p style="font-size: 10px; color: #94a3b8; text-align: center; margin-top: 30px;">This is a secure automated message from InstantMD.</p>
            </div>
        </div>
        """

    message = MessageSchema(
        subject=subject,
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)


async def send_cancellation_notice(email: str, doctor_name: str, appointment_time: str):
    html = f"""
    <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 24px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
        <div style="background-color: #0f172a; padding: 30px; text-align: center;">
            <h1 style="color: #10b981; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.05em;">Instant<span style="color: white;">MD</span></h1>
            <p style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 5px;">Secure Health Systems</p>
        </div>
        <div style="padding: 40px; color: #334155; background-color: white;">
            <h2 style="color: #e11d48; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em;">Appointment Cancelled</h2>
            <p style="font-size: 15px; line-height: 1.6;">Your scheduled consultation with <strong>Dr. {doctor_name}</strong> has been officially removed from our registry.</p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; margin: 25px 0;">
                <p style="margin: 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Release Schedule</p>
                <p style="margin: 8px 0 0 0; font-size: 16px; font-weight: 700; color: #0f172a;">{appointment_time}</p>
            </div>

            <p style="font-size: 13px; color: #64748b; font-style: italic;">The slot has been released back into the system for other patients.</p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">This is an automated security notification from InstantMD Systems.</p>
        </div>
    </div>
    """

    message = MessageSchema(
        subject="InstantMD: Cancellation Confirmed",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)

@app.patch("/appointments/{appt_id}/cancel")
async def cancel_appointment(
    appt_id: int,
    patient_id: str,
    email: str = None,  # 🟢 Makes it optional to avoid 422 errors
    background_tasks: BackgroundTasks = None,
    db: Session = Depends(get_db)
):
    # 1. Atomic Fetch and Update
    result = db.query(models.Appointment, models.Doctor). \
        join(models.Doctor, models.Appointment.doctor_id == models.Doctor.id). \
        filter(
        models.Appointment.id == appt_id,
        models.Appointment.patient_id == patient_id
    ).first()

    if not result:
        raise HTTPException(status_code=404, detail="Appointment record not found or unauthorized.")

    appt, doc = result

    # 2. Prevent double cancellation
    if appt.status == models.ApptStatus.CANCELLED:
        return {"status": "info", "message": "Already cancelled"}

    appt.status = models.ApptStatus.CANCELLED

    try:
        db.commit()

        background_tasks.add_task(
            send_appointment_email,
            email=email,
            doctor_name=doc.name,
            address=doc.address,
            appointment_time=appt.appointment_time.strftime("%d %b, %I:%M %p"),
            mode=appt.type,
            is_cancellation=True
        )

        return {"status": "success", "message": "Ledger updated and notification queued."}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Systems error during cancellation logic.")
