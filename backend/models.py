from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, Float
from database import Base
import enum

# Enums help prevent "garbage data" in your DB
class ApptStatus(enum.Enum):
    BOOKED = "booked"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    specialization = Column(String(100), index=True)
    experience = Column(String(50))
    fees = Column(Integer)
    hospital_name = Column(String(255), default="Manipal Hospital")
    address = Column(String(500), default="Old Airport Road, Bengaluru")
    bio = Column(Text)
    image_url = Column(String(500))
    education = Column(String)
    rating = Column(Float, default=4.5)
    total_consultations = Column(Integer, default=100)
    start_time = Column(String, default="09:00")
    end_time = Column(String, default="17:00")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String(255), index=True) # This will be the Clerk User ID
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    appointment_time = Column(DateTime, nullable=False)
    status = Column(Enum(ApptStatus), default=ApptStatus.BOOKED)
    type = Column(String(50)) # Online or Offline