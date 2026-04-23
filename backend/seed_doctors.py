import models
import random
from database import SessionLocal, engine

db = SessionLocal()

# Categorized lists for gender-image matching
male_names = [
    "Dr. Aryan K.", "Dr. Kabir S.", "Dr. Ishaan R.", "Dr. Rehan P.",
    "Dr. Advait B.", "Dr. Armaan N.", "Dr. Vivaan G.", "Dr. Reyansh L.",
    "Dr. Nihal C.", "Dr. Sameer K.", "Dr. Vishal K.V", "Dr. Karthi E.",
    "Dr. Gautham K.", "Dr. Sai P.", "Dr. Zayn M.", "Dr. Saeed P."
]

female_names = [
    "Dr. Meher V.", "Dr. Zoya M.", "Dr. Sana A.", "Dr. Myra D.",
    "Dr. Kiara J.", "Dr. Diya T.", "Dr. Ananya S.", "Dr. Zara H.",
    "Dr. Avni W.", "Dr. Ira F.", "Dr. Arya S.", "Dr. Jessie J.",
    "Dr. Fathima B.", "Dr. Roy E.", "Dr. Yalina D.", "Dr. Aishwarya R.",
    "Dr. Kareena K.", "Dr. Mariyam W."
]

female_img_ids = [
    "5738735", "8376277", "4227090", "32254667", "32251893",
    "6749765", "7580821", "5998465", "32115953", "36665076"
]

male_img_ids = [
    "6762869", "19438560", "6050276", "4270375", "10695742",
    "27298085", "34573451", "5888161", "20894637", "29995617",
    "10691259"
]

specialties = [
    "Oncology", "Gynaecology & Obstetrics", "Cardiology", "Pulmonology",
    "Gastroenterology", "Ophthalmology", "Paediatrics", "Dermatology",
    "Pathology & Diagnostics", "Orthopedics", "Neurology", "Urology",
    "ENT", "Endocrinology", "Nephrology", "Psychiatry", "Radiology",
    "Dentistry", "General Medicine", "Physiotherapy", "Emergency Medicine"
]

hospitals = [
    {"name": "Aster CMI Hospital", "address": "Hebbal, Bengaluru"},
    {"name": "Manipal Hospital", "address": "Old Airport Road, Bengaluru"},
    {"name": "Apollo Hospitals", "address": "Bannerghatta Road, Bengaluru"},
    {"name": "Fortis Hospital", "address": "Cunningham Road, Bengaluru"},
    {"name": "Narayana Health City", "address": "Hosur Road, Bengaluru"}
]

edu_map = {
    "Oncology": "MBBS, MD, DM - Medical Oncology",
    "Gynaecology & Obstetrics": "MBBS, MS, DGO - Gynaecology",
    "Cardiology": "MBBS, MD, DM - Cardiology",
    "Pulmonology": "MBBS, MD, TDD - Chest Physician",
    "Gastroenterology": "MBBS, MD, DM - Gastroenterology",
    "Ophthalmology": "MBBS, MS - Ophthalmology",
    "Paediatrics": "MBBS, MD - Paediatrics",
    "Dermatology": "MBBS, MD, DVD - Dermatology",
    "Pathology & Diagnostics": "MBBS, MD - Pathology",
    "Orthopedics": "MBBS, MS - Orthopaedics",
    "Neurology": "MBBS, MD, DM - Neurology",
    "Urology": "MBBS, MS, MCh - Urology",
    "ENT": "MBBS, MS - ENT",
    "Endocrinology": "MBBS, MD, DM - Endocrinology",
    "Nephrology": "MBBS, MD, DM - Nephrology",
    "Psychiatry": "MBBS, MD - Psychiatry",
    "Radiology": "MBBS, MD, DMRD - Radiology",
    "Dentistry": "BDS, MDS - Oral Surgery",
    "General Medicine": "MBBS, MD - Internal Medicine",
    "Physiotherapy": "BPT, MPT - Musculoskeletal",
    "Emergency Medicine": "MBBS, MD - Emergency Medicine"
}

try:
    print("Cleaning database...")
    db.query(models.Appointment).delete()
    db.query(models.Doctor).delete()
    db.commit()

    doctor_list = []

    for spec in specialties:
        for i in range(5):
            hosp = random.choice(hospitals)
            is_female = random.choice([True, False])
            name = random.choice(female_names) if is_female else random.choice(male_names)
            selected_id = random.choice(female_img_ids if is_female else male_img_ids)

            name = random.choice(female_names) if is_female else random.choice(male_names)
            img_id = random.choice(female_img_ids) if is_female else random.choice(male_img_ids)
            image_url = f"https://images.pexels.com/photos/{selected_id}/pexels-photo-{selected_id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
            edu_bg = edu_map.get(spec, "MBBS, MD - Internal Medicine")

            doc = models.Doctor(
                name=name,
                specialization=spec,
                experience=f"{random.randint(5, 25)} Years",
                fees=random.choice([600, 800, 1000, 1200, 1500]),
                hospital_name=hosp["name"],
                address=hosp["address"],
                bio=f"Senior {spec} specialist at {hosp['name']}. Committed to delivering evidence-based care and clinical excellence.",
                image_url=image_url,  # This will now work without 404s
                education=edu_map.get(spec, "MBBS, MD - Internal Medicine"),
                rating=round(random.uniform(4.5, 4.9), 1),
                total_consultations=random.randint(500, 4500),
                start_time="09:00",
                end_time="18:00"
            )
            doctor_list.append(doc)

    random.shuffle(doctor_list)
    db.add_all(doctor_list)
    db.commit()
    print(f"Success! {len(doctor_list)} doctors seeded with verified images.")

except Exception as e:
    db.rollback()
    print(f"Error: {e}")
finally:
    db.close()