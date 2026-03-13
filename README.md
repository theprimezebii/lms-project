# LearnHub - MERN Stack Learning Management System

A full-stack Learning Management System built with MongoDB, Express, React, and Node.js.
Supports three user roles: Student, Instructor, and Admin, each with their own dashboard
and access controls.

---

## Technologies Used

**Frontend**
- React JS
- React Router v6
- Axios
- Bootstrap 5 / React Bootstrap

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcryptjs

---

## Project Structure

```
lms-project/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth & role middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── server.js
│   └── .env.example
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   └── common/     # Navbar, Sidebar, CourseCard, Footer
        ├── context/        # AuthContext
        ├── pages/
        │   ├── public/     # Home, About, CourseList, CourseDetail, Login, Register
        │   ├── student/    # Dashboard, MyCourses, Profile
        │   ├── instructor/ # Dashboard, CreateCourse, ManageCourses, EditCourse, UploadLesson
        │   └── admin/      # Dashboard, ManageUsers, AdminCourses, Analytics
        └── services/       # API service functions
```

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd lms-project
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms_db
JWT_SECRET=replace_this_with_a_strong_secret
JWT_EXPIRE=7d
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

The application will open at `http://localhost:3000`.

---

## User Roles

| Role       | Permissions |
|------------|-------------|
| Student    | Browse courses, enroll, track progress, manage profile |
| Instructor | Create/edit/delete courses, add lessons |
| Admin      | View all users, delete users, manage all courses, view analytics |

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | Get own profile |
| PUT | /api/auth/profile | Update profile |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses | List published courses |
| GET | /api/courses/:id | Course detail |
| POST | /api/courses | Create course (instructor) |
| PUT | /api/courses/:id | Update course (instructor/admin) |
| DELETE | /api/courses/:id | Delete course (instructor/admin) |
| POST | /api/courses/:id/lessons | Add lesson |
| GET | /api/courses/my-courses | Instructor's own courses |
| GET | /api/courses/admin/all | All courses (admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | All users (admin) |
| DELETE | /api/users/:id | Delete user (admin) |
| GET | /api/users/analytics | Platform analytics (admin) |

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/enroll | Enroll in course (student) |
| GET | /api/enroll/my-courses | Student's enrolled courses |
| PUT | /api/enroll/:courseId/progress | Update progress |

---

## Environment Variables

All sensitive configuration is managed through environment variables. Never commit `.env` files.

Backend `.env`:
- `PORT` - Server port
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - Token expiry (e.g. `7d`)
- `NODE_ENV` - `development` or `production`

Frontend `.env`:
- `REACT_APP_API_URL` - Backend API base URL

---

## Screenshots

Screenshots of major modules are included in the `/screenshots` directory.

---

## Author

Built as a final project for the MERN Stack Web Development course.
# lms-project
