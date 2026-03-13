import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { enrollService } from '../../services/enrollService';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    courseService
      .getCourseById(id)
      .then(setCourse)
      .catch(() => setError('Course not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'student') {
      setError('Only students can enroll in courses.');
      return;
    }
    setEnrolling(true);
    setError('');
    try {
      await enrollService.enroll(id);
      setEnrolled(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="page-loader">Loading course...</div>;
  if (!course) return <div className="container py-5 text-muted">Course not found.</div>;

  return (
    <div>
      <div style={{ background: '#1a1a2e', padding: '55px 0', color: '#fff' }}>
        <div className="container">
          <span
            style={{
              background: '#2d3a5e',
              color: '#4e9af1',
              padding: '3px 12px',
              borderRadius: 20,
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            {course.category}
          </span>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            {course.title}
          </h1>
          <p style={{ color: '#a8b2c0', maxWidth: 600, lineHeight: 1.7 }}>
            {course.description}
          </p>
          <p style={{ color: '#8899aa', fontSize: '0.88rem', marginTop: '0.75rem' }}>
            Instructor: <strong style={{ color: '#fff' }}>{course.instructor?.name}</strong>
            &nbsp;&nbsp;|&nbsp;&nbsp;Level:{' '}
            <strong style={{ color: '#fff', textTransform: 'capitalize' }}>{course.level}</strong>
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="p-4 rounded mb-4"
              style={{ background: '#fff', border: '1px solid #e9ecef' }}
            >
              <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Course Content</h4>
              {course.lessons && course.lessons.length > 0 ? (
                <div>
                  {course.lessons.map((lesson, i) => (
                    <div
                      key={lesson._id || i}
                      className="d-flex align-items-center gap-3 p-3 rounded mb-2"
                      style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: '#e8f0fe',
                          color: '#2a6db5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lesson.title}</div>
                        {lesson.duration && (
                          <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>
                            {lesson.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No lessons added yet.</p>
              )}
            </div>

            <div
              className="p-4 rounded"
              style={{ background: '#fff', border: '1px solid #e9ecef' }}
            >
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>About the Instructor</h4>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{course.instructor?.name}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                {course.instructor?.bio || 'No bio provided.'}
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="p-4 rounded"
              style={{
                background: '#fff',
                border: '1px solid #e9ecef',
                position: 'sticky',
                top: '1rem',
              }}
            >
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{ width: '100%', borderRadius: 6, marginBottom: '1rem' }}
                />
              )}
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                {course.price === 0 ? (
                  <span style={{ color: '#28a745' }}>Free</span>
                ) : (
                  `$${course.price}`
                )}
              </div>

              {error && <div className="alert-msg error">{error}</div>}

              {enrolled ? (
                <div>
                  <div className="alert-msg success">Successfully enrolled!</div>
                  <Link to="/student/my-courses" className="btn btn-primary w-100">
                    Go to My Courses
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn btn-primary w-100 py-2"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="mt-3" style={{ fontSize: '0.82rem', color: '#6c757d' }}>
                <div className="mb-1">
                  {course.lessons?.length || 0} lesson{course.lessons?.length !== 1 ? 's' : ''}
                </div>
                <div className="mb-1" style={{ textTransform: 'capitalize' }}>
                  Level: {course.level}
                </div>
                <div>Category: {course.category}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
