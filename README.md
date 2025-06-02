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
