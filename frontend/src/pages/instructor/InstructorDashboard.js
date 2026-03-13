import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService
      .getInstructorCourses()
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const published = courses.filter((c) => c.isPublished).length;
  const drafts = courses.filter((c) => !c.isPublished).length;
  const totalLessons = courses.reduce((a, c) => a + (c.lessons?.length || 0), 0);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Instructor Dashboard</h1>
        <p className="dashboard-page-subtitle">Welcome back, {user?.name}</p>

       <div className="row g-3 mb-4">
  <div className="col-sm-4">
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: '#e8f0fe' }}>
        <i className="bi bi-book" style={{ color: '#2a6db5', fontSize: '1.2rem' }}></i>
      </div>
      <div className="stat-card-info">
        <h4>{courses.length}</h4>
        <p>Total Courses</p>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: '#e8f5e9' }}>
        <i className="bi bi-check-circle" style={{ color: '#2e7d32', fontSize: '1.2rem' }}></i>
      </div>
      <div className="stat-card-info">
        <h4>{published}</h4>
        <p>Published</p>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: '#fff3e0' }}>
        <i className="bi bi-pencil" style={{ color: '#e65100', fontSize: '1.2rem' }}></i>
      </div>
      <div className="stat-card-info">
        <h4>{totalLessons}</h4>
        <p>Total Lessons</p>
      </div>
    </div>
  </div>
</div>

        <div
          style={{
            background: '#fff',
            borderRadius: 8,
            border: '1px solid #e9ecef',
            padding: '1.5rem',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontWeight: 700, margin: 0 }}>Your Courses</h5>
            <Link to="/instructor/create-course" className="btn btn-sm btn-primary">
              + New Course
            </Link>
          </div>

          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : courses.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-3">You have not created any courses yet.</p>
              <Link to="/instructor/create-course" className="btn btn-primary">
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="data-table">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Lessons</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td style={{ fontWeight: 500 }}>{course.title}</td>
                      <td>
                        <span className="course-category-badge">{course.category}</span>
                      </td>
                      <td>{course.lessons?.length || 0}</td>
                      <td>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: 20,
                            background: course.isPublished ? '#e8f5e9' : '#f5f5f5',
                            color: course.isPublished ? '#2e7d32' : '#757575',
                          }}
                        >
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/instructor/courses/${course._id}/edit`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/instructor/courses/${course._id}/lessons`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Lessons
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
