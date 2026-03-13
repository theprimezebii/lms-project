import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/public/Home';
import About from './pages/public/About';
import CourseList from './pages/public/CourseList';
import CourseDetail from './pages/public/CourseDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import StudentProfile from './pages/student/StudentProfile';

import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import ManageCourses from './pages/instructor/ManageCourses';
import UploadLesson from './pages/instructor/UploadLesson';
import EditCourse from './pages/instructor/EditCourse';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminCourses from './pages/admin/AdminCourses';
import Analytics from './pages/admin/Analytics';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student/dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/my-courses" element={<ProtectedRoute roles={['student']}><MyCourses /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><StudentProfile /></ProtectedRoute>} />

          <Route path="/instructor/dashboard" element={<ProtectedRoute roles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/instructor/create-course" element={<ProtectedRoute roles={['instructor']}><CreateCourse /></ProtectedRoute>} />
          <Route path="/instructor/manage-courses" element={<ProtectedRoute roles={['instructor']}><ManageCourses /></ProtectedRoute>} />
          <Route path="/instructor/courses/:id/edit" element={<ProtectedRoute roles={['instructor']}><EditCourse /></ProtectedRoute>} />
          <Route path="/instructor/courses/:id/lessons" element={<ProtectedRoute roles={['instructor']}><UploadLesson /></ProtectedRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute roles={['admin']}><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute roles={['admin']}><Analytics /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
