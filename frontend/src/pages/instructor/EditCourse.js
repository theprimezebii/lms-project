import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { courseService } from '../../services/courseService';

const categories = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Dev'];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    courseService
      .getCourseById(id)
      .then((course) => {
        setForm({
          title: course.title,
          description: course.description,
          category: course.category,
          price: course.price,
          level: course.level,
          thumbnail: course.thumbnail || '',
          isPublished: course.isPublished,
        });
      })
      .catch(() => setError('Failed to load course.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await courseService.updateCourse(id, form);
      setSuccess('Course updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
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
        <h1 className="dashboard-page-title">Edit Course</h1>
        <p className="dashboard-page-subtitle">Update course information</p>

        <div className="form-card">
          <h4>Course Details</h4>
          {error && <div className="alert-msg error">{error}</div>}
          {success && <div className="alert-msg success">{success}</div>}

          {form && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Category
                  </label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Level
                  </label>
                  <select
                    name="level"
                    className="form-select"
                    value={form.level}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={form.price}
                    onChange={handleChange}
                    min={0}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  className="form-control"
                  value={form.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  className="form-check-input"
                  checked={form.isPublished}
                  onChange={handleChange}
                />
                <label htmlFor="isPublished" className="form-check-label" style={{ fontSize: '0.9rem' }}>
                  Published
                </label>
              </div>

              <div className="d-flex gap-3">
                <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => navigate('/instructor/manage-courses')}
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
