from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AppointmentCreate(BaseModel):
    doctor_id: int
    patient_id: str
    appointment_time: datetime
    type: str

class DoctorCreate(BaseModel):
    name: str
    specialization: str
    experience: str
    fees: int
    hospital_name: str
    address: str
    bio: Optional[str]
    image_url: Optional[str]
    education: Optional[str]
    rating: Optional[float]
    total_consultations: Optional[int]
    start_time: Optional[str]
    end_time: Optional[str]

class DoctorResponse(BaseModel):
    id: int
    name: str
    specialization: str
    experience: str
    fees: int
    hospital_name: str
    address: str
    bio: Optional[str]
    image_url: Optional[str]
    education: Optional[str]
    rating: Optional[float]
    total_consultations: Optional[int]
    start_time: Optional[str]
    end_time: Optional[str]

    class Config:
        from_attributes = True

class AppointmentResponse(BaseModel):
    id: int
    doctor_id: int
    patient_id: str
    appointment_time: datetime
    type: str
    status: str

    class Config:
        from_attributes = True