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

---

## Core Features
* **Specialty-Based Doctor Discovery:** A structured navigation system that categorizes medical practitioners by specialized domains (e.g., Cardiology, Pediatrics). The backend utilizes optimized PostgreSQL queries to map and retrieve doctors belonging to specific specialty IDs, ensuring an organized and rapid discovery process.
* **Patient Portal:** Centralized hub for users to track appointment history and upcoming sessions.
* **Doctor Dashboard (RBAC Protected):** Specialized view for Doctors to manage upcoming appointments and patient queues.
* **Admin Orchestration (RBAC Protected):** Full administrative control over doctor registries (CRUD operations) and patient inquiry management.

## Tech Stack 

| Category | Technology | Implementation |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite), Tailwind** | Responsive SPA featuring a high-performance clinical dashboard. |
| **Backend** | **FastAPI** | Asynchronous Python framework orchestrated for high-concurrency slot booking. |
| **Backend** | **Pydantic** | Strict data validation and type-safe schemas ensuring integrity for payloads. |
| **Database** | **PostgreSQL (Supabase)** | Relational data persistence with ACID compliance for complex scheduling queries. |
| **ORM** | **SQLAlchemy** | Object-Relational Mapping for type-safe database interactions.|
| **Security** | **Clerk / JWT** | Stateless identity verification with Role-Based Access Control (RBAC). Client-side session management and secure route guarding.|
| **Containerization** | **Docker** | Fully containerized environment ensuring absolute parity between local development and production. |
| **Deployment** | **Vercel, Render** | Distributed cloud hosting architecture with automated CI/CD. |
| **Networking** | **Heartbeat Monitor** | External cron-based health checks to eliminate "Cold Start" latency. |

## Key Engineering Highlights

#### 1. Dynamic Sliding Window Algorithm
* **Engine:** Processes doctor availability in **15-minute increments** to calculate real-time scheduling windows.
* **Optimization:** Supports variable lengths (**30m, 45m, 60m**) and automatically injects clinical check-in buffers—moving beyond rigid, static slot systems.
* **Impact:** Maximizes provider utilization by eliminating "dead time" and schedule fragmentation.

#### 2. Concurrency Control & Soft-Locking
* **Mechanism:** Resolves high-traffic "Race Conditions" via an **Atomic Pending Ledger** and Soft-Locking.
* **Resiliency:** Temporary locks are placed in a `Pending_Bookings` table with a **10-minute TTL** (Time-To-Live). If a booking isn't finalized, the slot is automatically released to maintain liquidity.
* **Integrity:** Ensures **ACID-compliant transactions**, making oversubscription and double-booking mathematically impossible at the database layer.

#### 3. RBAC & Security Architecture
* **Identity:** Utilizes stateless **Clerk (JWT)** authentication with custom identity claims to verify user roles.
* **Authorization:** Implements "Least Privilege" using **FastAPI dependency injection** to guard Admin, Doctor, and Patient endpoints.
* **Privacy:** Enforces horizontal data isolation through **`/me` namespaces**, cryptographically barring users from accessing records outside their authorized scope.

#### 4. Asynchronous Performance Optimization
* **Performance:** Leverages FastAPI’s **`async/await`** for non-blocking I/O across all Supabase/PostgreSQL queries.
* **Efficiency:** Offloads SMTP notifications and logging to **background threads**, reducing API response latency by ~300ms.
* **Availability:** Integrates an external **heartbeat monitor** to eliminate "Cold Start" delays on cloud-hosted instances.
  
## API Architecture

*The backend follows a RESTful design pattern, utilizing **FastAPI Dependencies** to enforce Role-Based Access Control (RBAC) and ensure atomic database transactions. All sensitive operations are shielded by identity verification guards.*

| Method | Endpoint | Access | Technical Logic |
| :--- | :--- | :--- | :--- |
| `GET` | `/doctors/{id}/slots` | Public | Executes the **Sliding Window** algorithm to calculate dynamic 15m availability. |
| `POST` | `/bookings/create-intent` | Patient | Implements **Soft-Locking** with a 10-minute TTL to resolve high-traffic race conditions. |
| `POST` | `/bookings/confirm` | Patient | Atomic transition: Deletes `PendingBooking` and inserts `Appointment` in one transaction. |
| `GET` | `/appointments/me` | Patient | **Relational Join** (Appts + Doctors) with horizontal data isolation via patient ID. |
| `PATCH` | `/{id}/cancel` | Patient | Updates ledger status and triggers **Asynchronous Background Tasks** for emails. |
| `GET` | `/doctor/me` | Doctor | Restricted dashboard view for real-time queue management and profile status. |
| `GET` | `/admin/inquiries` | Admin | System ledger access for managing and resolving patient support tickets. |
| `PATCH` | `/admin/doctors/{id}/toggle` | Admin | Global registry management allowing status overrides for practitioner visibility. |
---
<div align="center">
  
*Developed by <a href="www.linkedin.com/in/nehakvallappil">Neha K Vallappil</a> & <a href="www.linkedin.com/in/k-suchith">Suchith K</a> as a major project for a Software Development Internship*
</div>
