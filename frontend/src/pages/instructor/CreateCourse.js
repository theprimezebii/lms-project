import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { courseService } from '../../services/courseService';

const categories = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Dev'];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    level: 'beginner',
    thumbnail: '',
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const course = await courseService.createCourse(form);
      navigate(`/instructor/courses/${course._id}/lessons`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Create New Course</h1>
        <p className="dashboard-page-subtitle">Fill in the details to publish your course</p>

        <div className="form-card">
          <h4>Course Details</h4>
          {error && <div className="alert-msg error">{error}</div>}

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
                placeholder="e.g. Complete Web Development Bootcamp"
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
                placeholder="Describe what students will learn in this course..."
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
                Thumbnail URL (optional)
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
              <label
                htmlFor="isPublished"
                className="form-check-label"
                style={{ fontSize: '0.9rem' }}
              >
                Publish this course immediately
              </label>
            </div>

            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? 'Creating...' : 'Create Course'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => navigate('/instructor/manage-courses')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
