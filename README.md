🚀 Flowtrack – Full Stack Project Management App

Flowtrack is a modern full-stack task and project management platform designed to help teams collaborate, organize workflows, and track progress efficiently using Kanban boards.

🌐 Live Demo
Frontend: https://flowtrack-fawn.vercel.app
Backend: https://flowtrack-backend-fsrq.onrender.com
✨ Features
🔐 Authentication
User registration & login (JWT-based)
🏢 Workspaces
Create and manage multiple workspaces
Invite members
📁 Projects
Organize projects inside workspaces
Add project members
✅ Tasks (Kanban Board)
Drag & drop tasks (ToDo, In Progress, Review, Done)
Assign tasks to project members
Set priority & status
💬 Comments
Add and view comments per task
🗑️ Delete with Confirmation
Two-step verification (type DELETE)
Cascade deletion (projects → tasks)
🎨 Modern UI
Clean, responsive design
Dark-themed dashboard
Interactive components
🛠️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Axios
DnD Kit (Drag & Drop)
Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
📂 Project Structure
flowtrack/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
⚙️ Environment Variables
Backend (.env)
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
📈 Future Improvements
🔔 Real-time notifications (Socket.io)
👤 User avatars & profiles
📊 Analytics dashboard
📱 Mobile responsiveness improvements
🌙 Theme switch (light/dark toggle)
👨‍💻 Author
JAGADEESH_KONDAKA
⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
