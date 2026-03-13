import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { userService } from '../../services/userService';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getAnalytics()
      .then(setAnalytics)
      .catch(() => setAnalytics(null))
      .finally(() => setLoading(false));
  }, []);

  const stats = analytics
    ? [
        { label: 'Total Users', value: analytics.totalUsers, bg: '#e8f0fe', color: '#2a6db5' },
        { label: 'Students', value: analytics.totalStudents, bg: '#e8f5e9', color: '#2e7d32' },
        { label: 'Instructors', value: analytics.totalInstructors, bg: '#fff3e0', color: '#e65100' },
        { label: 'Courses', value: analytics.totalCourses, bg: '#fce4ec', color: '#c2185b' },
        { label: 'Enrollments', value: analytics.totalEnrollments, bg: '#ede7f6', color: '#512da8' },
      ]
    : [];

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Admin Dashboard</h1>
        <p className="dashboard-page-subtitle">Platform overview and quick actions</p>

        {loading ? (
          <p className="text-muted">Loading analytics...</p>
        ) : (
          <>
            <div className="row g-3 mb-4">
              {stats.map((s) => (
                <div className="col-6 col-md-4 col-lg-2" key={s.label} style={{ minWidth: 160 }}>
                  <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: s.bg }}>
                      <span style={{ color: s.color, fontWeight: 700, fontSize: '1rem' }}>
                        {s.value}
                      </span>
                    </div>
                    <div className="stat-card-info">
                      <p style={{ margin: 0, fontSize: '0.82rem' }}>{s.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 8,
                    border: '1px solid #e9ecef',
                    padding: '1.5rem',
                  }}
                >
                  <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Recent Users</h5>
                  {analytics?.recentUsers?.length > 0 ? (
                    analytics.recentUsers.map((u) => (
                      <div
                        key={u._id}
                        className="d-flex justify-content-between align-items-center py-2"
                        style={{ borderBottom: '1px solid #f1f3f5' }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{u.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>{u.email}</div>
                        </div>
                        <span className={`role-badge ${u.role}`}>{u.role}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No users yet.</p>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 8,
                    border: '1px solid #e9ecef',
                    padding: '1.5rem',
                  }}
                >
                  <h5 style={{ fontWeight: 700, marginBottom: '1.2rem' }}>Quick Actions</h5>
                  <div className="d-flex flex-column gap-2">
                    <Link to="/admin/users" className="btn btn-outline-primary text-start">
                      Manage Users
                    </Link>
                    <Link to="/admin/courses" className="btn btn-outline-primary text-start">
                      Manage Courses
                    </Link>
                    <Link to="/admin/analytics" className="btn btn-outline-primary text-start">
                      View Full Analytics
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
