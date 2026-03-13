import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { courseService } from '../../services/courseService';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    courseService
      .getAdminAllCourses()
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course? All enrollments will also be removed.')) return;
    setDeletingId(id);
    try {
      await courseService.deleteCourse(id);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Manage Courses</h1>
        <p className="dashboard-page-subtitle">
          {courses.length} course{courses.length !== 1 ? 's' : ''} on the platform
        </p>

        <div className="mb-3" style={{ maxWidth: 340 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-muted">Loading courses...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted">No courses found.</p>
        ) : (
          <div className="data-table">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Instructor</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 500, maxWidth: 220 }}>{c.title}</td>
                    <td style={{ fontSize: '0.88rem' }}>{c.instructor?.name}</td>
                    <td>
                      <span className="course-category-badge">{c.category}</span>
                    </td>
                    <td style={{ fontSize: '0.88rem' }}>
                      {c.price === 0 ? (
                        <span style={{ color: '#28a745', fontWeight: 600 }}>Free</span>
                      ) : (
                        `$${c.price}`
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 20,
                          background: c.isPublished ? '#e8f5e9' : '#f5f5f5',
                          color: c.isPublished ? '#2e7d32' : '#757575',
                        }}
                      >
                        {c.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(c._id)}
                        disabled={deletingId === c._id}
                        className="btn btn-sm btn-outline-danger"
                      >
                        {deletingId === c._id ? '...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
