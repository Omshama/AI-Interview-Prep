# 🧠 AI Interview Prep

🚀 [Live Demo →](https://ai-interview-prep-gamma-six.vercel.app/)

**AI Interview Prep** is a full-stack web app designed to help developers prepare for software engineering interviews. It uses AI (Google Gemini) to generate intelligent Q&A tailored for frontend, backend, and full-stack roles.

---

## ✨ Features

- 🤖 **AI-Powered Q&A**  
  Role-specific interview questions and answers with Google Gemini.

- 🧠 **Concept Deep-Dives**  
  Expand answers to understand core concepts and reasoning.

- 📚 **Personalized Learning**  
  Filter by frontend, backend, and full-stack roles.

- 🗂 **Bookmark & Save**  
  Save important questions for review.

- 💬 **Clean, Responsive UI**  
  Built with React 19, Tailwind CSS, and Vite.

---

## 🧰 Tech Stack

### Frontend
- React 19, Vite, Tailwind CSS
- Axios, Framer Motion, React Router

### Backend
- Node.js, Express 5
- MongoDB + Mongoose
- Google Gemini AI via `@google/generative-ai`

---

## 🛠️ Getting Started

Follow the instructions below to set up the project locally.

---

### ⚙️ Prerequisites

- Node.js (v18 or later)
- MongoDB (local or MongoDB Atlas)
- Google Gemini API Key (get it from [MakerSuite](https://makersuite.google.com/app/apikey))

---

## 📦 Clone the Repository

```bash
git clone https://github.com/your-username/ai-interview-prep.git
cd ai-interview-prep

🧾 Backend Setup
bash
Copy
Edit
cd backend
npm install
➕ Create .env file in backend/:
env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret
▶️ Run the Backend Server:
bash
Copy
Edit
npm run dev
Backend will run on: http://localhost:5000

🎨 Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
➕ Create .env file in frontend/:
env
Copy
Edit
VITE_API_URL=http://localhost:5000
Make sure your API calls in frontend use import.meta.env.VITE_API_URL.

▶️ Run the Frontend Dev Server:
bash
Copy
Edit
npm run dev
App will run on: http://localhost:5173

🌐 Environment Variables Summary
🔒 Backend (backend/.env)
Variable	Description
PORT	Port to run backend server (default: 5000)
MONGODB_URI	MongoDB connection string
GOOGLE_API_KEY	Google Gemini API key
JWT_SECRET	JWT secret for token signing

🌐 Frontend (frontend/.env)
Variable	Description
VITE_API_URL	URL where backend API is running
