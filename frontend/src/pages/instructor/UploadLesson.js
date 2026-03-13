import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { courseService } from '../../services/courseService';

const UploadLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '', videoUrl: '', duration: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    courseService
      .getCourseById(id)
      .then(setCourse)
      .catch(() => setError('Course not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const updated = await courseService.addLesson(id, form);
      setCourse(updated);
      setForm({ title: '', content: '', videoUrl: '', duration: '' });
      setSuccess('Lesson added successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add lesson.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main"><p className="text-muted">Loading...</p></div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Course Lessons</h1>
        <p className="dashboard-page-subtitle">
          {course?.title} &mdash; {course?.lessons?.length || 0} lesson{course?.lessons?.length !== 1 ? 's' : ''}
        </p>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="form-card">
              <h4>Add New Lesson</h4>
              {error && <div className="alert-msg error">{error}</div>}
              {success && <div className="alert-msg success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Introduction to HTML"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Content / Notes
                  </label>
                  <textarea
                    name="content"
                    className="form-control"
                    rows={4}
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Lesson content or description..."
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Video URL (optional)
                  </label>
                  <input
                    type="text"
                    name="videoUrl"
                    className="form-control"
                    value={form.videoUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Duration (optional)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    className="form-control"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 12 min"
                  />
                </div>
                <div className="d-flex gap-3">
                  <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                    {saving ? 'Adding...' : 'Add Lesson'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/instructor/manage-courses')}
                  >
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-7">
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1px solid #e9ecef',
                padding: '1.5rem',
              }}
            >
              <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Existing Lessons</h5>
              {!course?.lessons || course.lessons.length === 0 ? (
                <p className="text-muted">No lessons added yet. Use the form to add your first lesson.</p>
              ) : (
                course.lessons.map((lesson, i) => (
                  <div
                    key={lesson._id || i}
                    className="d-flex gap-3 p-3 rounded mb-2"
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
                    <div className="flex-grow-1">
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lesson.title}</div>
                      {lesson.duration && (
                        <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>
                          {lesson.duration}
                        </div>
                      )}
                      {lesson.content && (
                        <div
                          style={{
                            fontSize: '0.82rem',
                            color: '#6c757d',
                            marginTop: '0.25rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: 300,
                          }}
                        >
                          {lesson.content}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLesson;
