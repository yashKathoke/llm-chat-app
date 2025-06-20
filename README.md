#  Chat App

This is a chat app with hardcoded response (LLM API not called)

---

## 🧱 Project Structure

```
llm-chat-app/
├── backend/         # FastAPI backend
├── frontend/        # React frontend
├── IaC/             # Infrastructure (Docker Compose, Nginx config, env files)
```

---

## ⚙️ Local Development Setup

### ✅ Prerequisites

* Docker & Docker Compose installed
* MongoDB Atlas cluster or local MongoDB
* Node.js & Python (optional for manual local runs)

### 📦 Clone Repository

```bash
git clone https://github.com/yashKathoke/llm-chat-app.git
cd llm-chat-app/IaC
```

### 🛠️ Create `.env` File

Create `.env` inside the `IaC/` directory:

```env
# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/your-db
MONGO_DB_NAME=your-db

```
Create `.env` inside the `frontend/` directory:

```env

# Backend URL used by frontend which is running locally
VITE_BACKEND_URL=http://localhost:8000
```

> Frontend expects `VITE_BACKEND_URL` for local api calling

### 🚀 Run Locally with Docker Compose

From the `IaC/` directory:

```bash
docker-compose up --build
```

* Frontend: [http://localhos:3000](http://localhost:3000)
* Backend: [http://localhost:8000](http://localhost:8000/docs)

---

## ☁️ AWS EC2 Deployment (No SSL)

### 🔹 1. Launch EC2 Instance

* OS: Ubuntu 22.04 LTS
* Type: t3.micro (free tier eligible)
* Storage: 20 GiB (gp2)
* Inbound rules:

  * **22**: SSH
  * **80**: HTTP
  * **8000** (optional for backend testing)

### 🔹 2. SSH into EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 🔹 3. Install Docker & Docker Compose

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 🔹 4. Clone Project on EC2

```bash
git clone https://github.com/yashKathoke/llm-chat-app.git
cd llm-chat-app/IaC
```

### 🔹 5. Set Environment Variables

Create a `.env` file in `IaC/` with:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/your-db
MONGO_DB_NAME=your-db

# For Cors(protecting backend access)
FRONTEND_URL = your-domain-url 
```
> Backend api is handled by nginx at /api

### 🔹 6. Nginx Configuration

Ensure `nginx.conf` inside `IaC/` has:

>This will change after adding domain.

```nginx
events {}

http {
  server {
    listen 80;

    location / {
      proxy_pass http://frontend:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
      rewrite ^/api(/.*)$ $1 break;
      proxy_pass http://backend:8000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

### 🔹 7. Run App on EC2

* Before running make sure to add EC2 ip in `mongoDB Atlas` or backend will not work.

```bash
cd IaC/
docker-compose up --build -d
```
> `-d` make sure server keeps running even after logout of ssh

* Visit: `http://<your-ec2-public-ip>/`
* Frontend uses relative paths to access `/api/...`, routed by Nginx.

---

## 🛠️ Common Commands

* View logs:
  `docker-compose logs -f`

* Stop app:
  `docker-compose down`

* Rebuild after changes:
  `docker-compose up --build -d`

---

## ✅ Verifying Deployment

* Your EC2 public IP (e.g. `http://3.22.11.88`) should serve the app.
* Frontend requests to `/api/...` should be reverse-proxied to backend.
* No HTTPS/SSL used — all traffic is served over HTTP (port 80).

---

## 💡 Notes

* Never expose port 8000 or 3000 publicly; Nginx handles all routing.
* Make sure `MongoDB Atlas` allows `access` from your EC2 IP.


---


