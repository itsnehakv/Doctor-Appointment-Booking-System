# InstantMD | Doctor Appointment Booking System

<div align="center"><a href="https://instantmd-official.vercel.app" alt="InstantMD Live Dashboard"><img src="https://img.shields.io/badge/Visit_InstantMD_↗-6EE7B7?style=for-the-badge" /></a></div>
<br>
  
<div align="center"><i>A high-concurrency backend-driven platform designed to automate clinical scheduling through dynamic availability algorithms and atomic transaction handling.</i></div>

## System Objectives:
InstantMD was engineered to solve the "Double-Booking" problem in healthcare. Unlike traditional static scheduling, this system treats time as a dynamic resource. By implementing a decoupled architecture with a **FastAPI** backend and a **React** frontend, the platform ensures sub-second response times while maintaining high data integrity across thousands of potential concurrent sessions.


<div align="center">
<h4>• Core Implementation •</h4>
  
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-05998b?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/) •
[![React](https://img.shields.io/badge/Frontend-React-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/) • 
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/) •
[![Supabase](https://img.shields.io/badge/Platform-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) •
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/) •
</div>

<div align="center">
<h5>• Languages •</h5>

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) 
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

</div>

## Core Features
* **Specialty-Based Doctor Discovery:** A structured navigation system that categorizes medical practitioners by specialized domains (e.g., Cardiology, Pediatrics). The backend utilizes optimized PostgreSQL queries to map and retrieve doctors belonging to specific specialty IDs, ensuring an organized and rapid discovery process.
* **Patient Portal:** Centralized hub for users to track appointment history and upcoming sessions.
* **Doctor Dashboard (RBAC Protected):** Specialized view for Doctors to manage upcoming appointments and patient queues.
* **Admin Orchestration (RBAC Protected):** Full administrative control over doctor registries (CRUD operations) and patient inquiry management.

### 1. Dynamic Sliding Window Algorithm
* **Engine:** The core scheduling logic utilizes a custom engine that scans doctor availability in 15-minute increments to calculate real-time availability windows.
* **Optimization:** Unlike static slot systems, this supports variable appointment lengths (30m, 45m, 60m) while automatically injecting clinical check-in buffers.
* **Impact:** This algorithmic approach maximizes provider utilization by eliminating schedule fragmentation and "dead time," ensuring high operational efficiency.

### 2. Concurrency Control & Soft-Locking
* **Mechanism:** To resolve the "Race Condition" inherent in high-traffic booking systems, I implemented an **Atomic Pending Ledger** utilizing **Soft-Locking** mechanisms.
* **Resiliency:** When a user initiates a booking, the specific time slot is temporarily locked in a `Pending_Bookings` table. An automated 10-minute **TTL (Time-To-Live)** ensures slot liquidity; if the booking is not finalized, the lock is automatically released.
* **Integrity:** Guaranteed ACID-compliant integrity, preventing oversubscription and double-booking at the database layer.

### 3. Role-Based Access Control (RBAC) & Security
* **Identity:** The system employs stateless authentication via **Clerk (JWT)** with embedded custom identity claims to verify user roles.
* **Authorization:** Access control is enforced through FastAPI dependency-injected security guards, establishing a "Least Privilege" environment for Admin, Doctor, and Patient roles.
* **Privacy:** Strict horizontal data isolation is achieved through `/me` namespaces, ensuring that users are cryptographically barred from accessing sensitive medical records or scheduling histories outside their own.

### 4. Asynchronous Performance Optimization
* **Performance:** By leveraging FastAPI’s `async/await`, the system maintains non-blocking I/O across all Supabase/PostgreSQL queries.
* **Efficiency:** Secondary processes, such as SMTP email notifications and logging, are offloaded to background threads, reducing API response latency by ~300ms.
* **Availability:** An external heartbeat monitor is integrated to mitigate "Cold Start" latency on cloud-hosted instances, ensuring the API remains responsive for immediate user requests.

### 5. Containerization & Deployment
* **Standardization:** The application is fully containerized using **Docker**, ensuring absolute environment parity between local development and production.
* **Orchestration:** The architecture is distributed across **Render** (FastAPI backend in Docker) and **Vercel** (React frontend), utilizing a decoupled approach for independent scaling of services.
* **Reliability:** Dockerization allows for rapid deployment cycles and consistent execution of the Python environment, regardless of the underlying cloud infrastructure.
## 🚀 Key Technical Implementation

### 1. Dynamic Sliding Window Algorithm
The core scheduling logic utilizes a **Sliding Window** to scan doctor availability.
* **Interval Logic:** Scans the database in 15-minute increments.
* **Dynamic Sizing:** Allows for variable appointment lengths (30m, 45m, 60m) while automatically injecting check-in buffers.
* **Business Impact:** Maximizes doctor utilization rates by eliminating fragmented "dead time" between appointments.

### 2. Concurrency Control (Atomic Pending Ledger)
To handle the "Race Condition" during high-traffic booking periods:
* **Soft-Locking:** Implemented a `Pending_Bookings` ledger that creates a temporary lock on a slot for 10 minutes.
* **TTL (Time-To-Live):** Automated expiration logic releases locks if payment or confirmation is not received, ensuring slot liquidity.
* **Integrity:** Prevents overbooking at the database level rather than just the UI level.

### 3. Role-Based Access Control (RBAC) & Security
* **Stateless Authentication:** Utilizes **JWT (JSON Web Tokens)** for identity verification.
* **Backend Guards:** Custom decorators verify user claims (Doctor, Admin, Patient) before granting access to sensitive clinical endpoints.
* **Data Privacy:** Implemented `/me` endpoints to ensure users can only access their personal medical records and scheduling history.

### 4. Asynchronous Performance Optimization
* **Non-Blocking I/O:** Leveraged FastAPI’s `async/await` for database queries and external service calls.
* **Background Processing:** SMTP email notifications are offloaded to background threads, allowing the main API thread to return a 'Success' status immediately to the user.

## Tech Stack 

| Category | Technology | Implementation |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite), Tailwind** | Responsive SPA featuring a high-performance clinical dashboard. |
| **Backend** | **FastAPI** | Asynchronous Python framework orchestrated for high-concurrency slot booking. |
| **Backend** | **Pydantic** | Strict data validation and type-safe schemas ensuring integrity for payloads. |
| **Database** | **PostgreSQL (Supabase)** | Relational data persistence with ACID compliance for complex scheduling queries. |
| **ORM** | **SQLAlchemy** | Object-Relational Mapping for type-safe database interactions.|
| **Security** | **Clerk / JWT** | Stateless identity verification with Role-Based Access Control (RBAC). Client-side session management and secure route guarding.|
| **Deployment** | **Vercel, Render** | Distributed cloud hosting architecture with automated CI/CD. |
| **Networking** | **Heartbeat Monitor** | External cron-based health checks to eliminate "Cold Start" latency. |


## 📊 Database Schema
The relational database is designed for referential integrity:
* **One-to-Many:** Doctors/Patients to Appointments.
* **Transaction Table:** Dedicated `Pending_Bookings` table for temporary state management to keep the primary `Appointments` table optimized for read-heavy operations.

---
*Developed as a Strategic AI & Backend Portfolio Project.*
