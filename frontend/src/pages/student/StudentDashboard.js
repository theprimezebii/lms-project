import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { enrollService } from '../../services/enrollService';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollService
      .getMyCourses()
      .then(setEnrollments)
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, []);

  const averageProgress =
    enrollments.length > 0
      ? Math.round(enrollments.reduce((a, e) => a + e.progress, 0) / enrollments.length)
      : 0;

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Dashboard</h1>
        <p className="dashboard-page-subtitle">Welcome back, {user?.name}</p>

        <div className="row g-3 mb-4">
  <div className="col-sm-4">
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: '#e8f0fe' }}>
        <i className="bi bi-journal-bookmark" style={{ color: '#2a6db5', fontSize: '1.2rem' }}></i>
      </div>
      <div className="stat-card-info">
        <h4>{enrollments.length}</h4>
        <p>Enrolled Courses</p>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: '#e8f5e9' }}>
        <i className="bi bi-check-circle" style={{ color: '#2e7d32', fontSize: '1.2rem' }}></i>
      </div>
      <div className="stat-card-info">
        <h4>{enrollments.filter((e) => e.progress === 100).length}</h4>
        <p>Completed</p>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: '#fff3e0' }}>
        <i className="bi bi-bar-chart-line" style={{ color: '#e65100', fontSize: '1.2rem' }}></i>
      </div>
      <div className="stat-card-info">
        <h4>{averageProgress}%</h4>
        <p>Avg. Progress</p>
      </div>
    </div>
  </div>
</div>

        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', padding: '1.5rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontWeight: 700, margin: 0 }}>Recent Courses</h5>
            <Link to="/student/my-courses" className="btn btn-sm btn-outline-primary">
              View All
            </Link>
          </div>

          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-3">You have not enrolled in any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          ) : (
            enrollments.slice(0, 4).map((enrollment) => (
              <div
                key={enrollment._id}
                className="d-flex align-items-center gap-3 mb-3 p-3 rounded"
                style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}
              >
                <div className="flex-grow-1">
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                    {enrollment.course?.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d', marginBottom: '0.5rem' }}>
                    by {enrollment.course?.instructor?.name}
                  </div>
                  <div className="progress-bar-custom">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4e9af1', minWidth: 36, textAlign: 'right' }}>
                  {enrollment.progress}%
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
