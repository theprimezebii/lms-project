import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { courseService } from '../../services/courseService';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCourses = () => {
    setLoading(true);
    courseService
      .getInstructorCourses()
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;
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

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <div>
            <h1 className="dashboard-page-title mb-0">Manage Courses</h1>
            <p className="dashboard-page-subtitle mt-1">
              {courses.length} course{courses.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <Link to="/instructor/create-course" className="btn btn-primary">
            + New Course
          </Link>
        </div>

        {loading ? (
          <p className="text-muted">Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-5">
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
                  <th>Level</th>
                  <th>Price</th>
                  <th>Lessons</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td style={{ fontWeight: 500, maxWidth: 220 }}>{course.title}</td>
                    <td>
                      <span className="course-category-badge">{course.category}</span>
                    </td>
                    <td style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>
                      {course.level}
                    </td>
                    <td style={{ fontSize: '0.9rem' }}>
                      {course.price === 0 ? (
                        <span style={{ color: '#28a745', fontWeight: 600 }}>Free</span>
                      ) : (
                        `$${course.price}`
                      )}
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
                        <button
                          onClick={() => handleDelete(course._id)}
                          disabled={deletingId === course._id}
                          className="btn btn-sm btn-outline-danger"
                        >
                          {deletingId === course._id ? '...' : 'Delete'}
                        </button>
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
  );
};

export default ManageCourses;
