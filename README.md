# Workflow Management System

A full-stack workflow and task management application built with the MERN stack. The application provides secure user authentication and allows users to create, view, update, and delete tasks while managing task status, priority, and due dates.

## Features

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Task status management
- Task priority management
- Task due dates
- Search tasks
- Filter tasks by status
- Filter tasks by priority
- Dashboard with task statistics
- Responsive user interface

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt

### Development Tools
- VS Code
- Thunder Client
- Nodemon

## Project Structure

```text
Workflow Management System/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md