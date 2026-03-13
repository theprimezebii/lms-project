import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { enrollService } from '../../services/enrollService';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollService
      .getMyCourses()
      .then(setEnrollments)
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">My Courses</h1>
        <p className="dashboard-page-subtitle">Courses you are currently enrolled in</p>

        {loading ? (
          <p className="text-muted">Loading your courses...</p>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-3">You have not enrolled in any courses yet.</p>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {enrollments.map((enrollment) => (
              <div className="col-md-6 col-xl-4" key={enrollment._id}>
                <div
                  className="h-100 p-4 rounded"
                  style={{ background: '#fff', border: '1px solid #e9ecef' }}
                >
                  <div
                    className="mb-3"
                    style={{
                      width: '100%',
                      height: 120,
                      borderRadius: 6,
                      background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                    }}
                  >
                    &#128218;
                  </div>
                  <span className="course-category-badge">
                    {enrollment.course?.category || 'Course'}
                  </span>
                  <h6 style={{ fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                    {enrollment.course?.title}
                  </h6>
                  <p style={{ fontSize: '0.82rem', color: '#6c757d', marginBottom: '1rem' }}>
                    by {enrollment.course?.instructor?.name}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#6c757d' }}>Progress</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4e9af1' }}>
                      {enrollment.progress}%
                    </span>
                  </div>
                  <div className="progress-bar-custom">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`/courses/${enrollment.course?._id}`}
                      className="btn btn-sm btn-outline-primary w-100"
                    >
                      {enrollment.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
