# Shipyard Contacts App

A **Dockerized full-stack contact management application** built with React (frontend), Node.js + Express (backend), and PostgreSQL (database).  
This project demonstrates containerized development, inter-service communication, and database persistence using **Docker Compose**.

---

Feautures

- **Frontend:** React interface for adding and listing contacts  
- **Backend:** Express REST API with health checks and CRUD operations  
- **Database:** PostgreSQL for persistent data storage  
- **Dockerized:** Each service runs in its own container (frontend, backend, database)  
- **Hot reload support:** Fast development workflow using Docker volumes  
- **Port mapping:** Access frontend and backend directly on your localhost  

---

 Architecture Overview

shipyard-contacts/
├── backend/
│ ├── index.js
│ ├── package.json
│ ├── Dockerfile
│ └── ...
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ ├── Dockerfile
│ └── ...
├── docker-compose.yml
└── README.md

yaml
Copy code

- **Frontend** → React app running on port `3000`  
- **Backend** → Node.js + Express API on port `4000`  
- **Database** → PostgreSQL on port `5432`

---

 Prerequisites

Before you begin, ensure you have:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running  
- WSL integration enabled (for Ubuntu users on Windows)  
- Optional: [curl](https://curl.se/) and [jq](https://jqlang.github.io/jq/) for testing API endpoints

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<Sylviacloud24>/shipyard-contacts.git
cd shipyard-contacts

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/013683e2-6e15-43a5-8270-acec899c4e41" />




2️⃣ Build and start containers
bash
Copy code
docker compose up --build
This will:

Pull required base images

Build the backend and frontend images

Start up the database, backend, and frontend containers
<img width="1920" height="1080" alt="image (7)" src="https://github.com/user-attachments/assets/85387dc6-2810-4ae4-a4e4-8051973483ec" />

You’ll see messages like:

Copy code
✔ shipyard-contacts-db-1        Created
✔ shipyard-contacts-backend-1   Created
✔ shipyard-contacts-frontend-1  Created
🌐 Access the App
Service	URL	Description
Frontend (React)	http://localhost:3000	UI for managing contacts
Backend (API)	http://localhost:4000	Express server endpoint
Health Check	http://localhost:4000/health	Returns { "ok": true } when backend is healthy

🧪 Testing
Check backend health
bash
Copy code
curl http://localhost:4000/health
# -> {"ok":true}
Add a contact via API
bash
Copy code
curl -X POST http://localhost:4000/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"+2348000000000"}'
Query the database
bash
Copy code
docker compose exec db psql -U postgres -d contacts -c "SELECT * FROM contacts;"
🐳 Useful Docker Commands
Command	Description
docker compose ps	View running containers
docker compose logs -f	View all logs in real-time
docker compose logs backend --tail=100	View backend logs
docker compose down	Stop containers
docker compose down -v	Stop and remove volumes (wipes DB data)
docker compose up -d --build	Rebuild and start containers in detached mode

🧰 Tech Stack
Layer	Technology
Frontend	React, HTML, CSS
Backend	Node.js, Express
Database	PostgreSQL
Containerization	Docker, Docker Compose
Dev Environment	WSL + Ubuntu

💡 Future Improvements
Add authentication (JWT)

Deploy to AWS ECS or Render

Add Nginx reverse proxy for production builds

Include Jest tests for backend

Setup CI/CD pipeline using GitHub Actions

👩🏽‍💻 Author
Sylvia Okoye
 Technical Support Specialist | DevOps Engineer
📧 sylviaokoye20@gmail.com
www.linkedin.com/in/sylvia-okoye


🏁 License
This project is open-source and available under the MIT License.
