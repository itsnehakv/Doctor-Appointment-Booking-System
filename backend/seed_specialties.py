import requests
import random
from database import SessionLocal
import models

# Exactly matching your Frontend Services list
SERVICES = [
    {"title": "Oncology", "category": "Medical"},
    {"title": "Gynaecology & Obstetrics", "category": "Surgical"},
    {"title": "Cardiology", "category": "Medical"},
    {"title": "Pulmonology", "category": "Medical"},
    {"title": "Gastroenterology", "category": "Surgical"},
    {"title": "Ophthalmology", "category": "Surgical"},
    {"title": "Paediatrics", "category": "Paediatric"},
    {"title": "Dermatology", "category": "Medical"},
    {"title": "Pathology & Diagnostics", "category": "Diagnostic"},
    {"title": "Orthopedics", "category": "Surgical"},
    {"title": "Neurology", "category": "Medical"},
    {"title": "Urology", "category": "Surgical"},
    {"title": "ENT", "category": "Medical"},
    {"title": "Endocrinology", "category": "Medical"},
    {"title": "Nephrology", "category": "Medical"},
    {"title": "Psychiatry", "category": "Medical"},
    {"title": "Radiology", "category": "Diagnostic"},
    {"title": "Dentistry", "category": "Diagnostic"},
    {"title": "General Medicine", "category": "Medical"},
    {"title": "Physiotherapy", "category": "Paediatric"},
    {"title": "Emergency Medicine", "category": "Medical"}
]


def seed_doctors():
    db = SessionLocal()
    print("🚀 Seeding 105 Doctors based on Frontend Services...")

    try:
        for service in SERVICES:
            title = service["title"]
            print(f"  - Generating 5 doctors for {title}...")

            # Fetch 5 random people from the API
            response = requests.get(f"https://randomuser.me/api/?results=5&nat=us,gb")
            data = response.json()

            for user in data['results']:
                full_name = f"Dr. {user['name']['first']} {user['name']['last']}"

                new_doctor = models.Doctor(
                    name=full_name,
                    specialization=title,  # Matches frontend 'title'
                    experience=f"{random.randint(5, 20)} Years",
                    fees=random.choice([500, 750, 1000, 1500]),
                    bio=f"Specialist in {title} with a focus on {service['category'].lower()} excellence.",
                    image_url=user['picture']['large']
                )
                db.add(new_doctor)

        db.commit()
        print("✅ Success! 105 Doctors are now in Supabase.")
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_doctors()