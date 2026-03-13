import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { userService } from '../../services/userService';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getAnalytics()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const cards = data
    ? [
        {
          label: 'Total Users',
          value: data.totalUsers,
          bg: '#e8f0fe',
          color: '#2a6db5',
          note: 'All registered accounts',
        },
        {
          label: 'Students',
          value: data.totalStudents,
          bg: '#e8f5e9',
          color: '#2e7d32',
          note: `${data.totalUsers ? Math.round((data.totalStudents / data.totalUsers) * 100) : 0}% of users`,
        },
        {
          label: 'Instructors',
          value: data.totalInstructors,
          bg: '#fff3e0',
          color: '#e65100',
          note: `${data.totalUsers ? Math.round((data.totalInstructors / data.totalUsers) * 100) : 0}% of users`,
        },
        {
          label: 'Total Courses',
          value: data.totalCourses,
          bg: '#fce4ec',
          color: '#c2185b',
          note: 'All created courses',
        },
        {
          label: 'Enrollments',
          value: data.totalEnrollments,
          bg: '#ede7f6',
          color: '#512da8',
          note: 'Total active enrollments',
        },
        {
          label: 'Avg. Enrollments',
          value: data.totalCourses > 0 ? (data.totalEnrollments / data.totalCourses).toFixed(1) : 0,
          bg: '#e0f7fa',
          color: '#00838f',
          note: 'Per course',
        },
      ]
    : [];

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Analytics</h1>
        <p className="dashboard-page-subtitle">Platform metrics and activity</p>

        {loading ? (
          <p className="text-muted">Loading analytics...</p>
        ) : !data ? (
          <p className="text-muted">Could not load analytics.</p>
        ) : (
          <>
            <div className="row g-3 mb-5">
              {cards.map((c) => (
                <div className="col-sm-6 col-lg-4" key={c.label}>
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid #e9ecef',
                      borderRadius: 8,
                      padding: '1.4rem 1.6rem',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: c.color,
                        marginBottom: '0.2rem',
                      }}
                    >
                      {c.value}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.15rem' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>{c.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1px solid #e9ecef',
                padding: '1.5rem',
              }}
            >
              <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Recently Joined Users</h5>
              {data.recentUsers?.length > 0 ? (
                <div className="data-table">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentUsers.map((u) => (
                        <tr key={u._id}>
                          <td style={{ fontWeight: 500 }}>{u.name}</td>
                          <td style={{ fontSize: '0.88rem', color: '#4a4a4a' }}>{u.email}</td>
                          <td>
                            <span className={`role-badge ${u.role}`}>{u.role}</span>
                          </td>
                          <td style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No users yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
