import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import CourseCard from '../../components/common/CourseCard';

const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Dev'];
const levels = ['All', 'beginner', 'intermediate', 'advanced'];

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const filters = {};
    if (search) filters.search = search;
    if (selectedCategory !== 'All') filters.category = selectedCategory;
    if (selectedLevel !== 'All') filters.level = selectedLevel;

    courseService
      .getAllCourses(filters)
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [search, selectedCategory, selectedLevel]);

  return (
    <div>
      <div style={{ background: '#1a1a2e', padding: '50px 0', color: '#fff' }}>
        <div className="container">
          <h1 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>All Courses</h1>
          <p style={{ color: '#a8b2c0' }}>
            {courses.length} course{courses.length !== 1 ? 's' : ''} available
          </p>
          <div className="mt-3" style={{ maxWidth: 480 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: '#fff', color: '#1a1a2e' }}
            />
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-3">
            <div
              className="p-3 rounded"
              style={{ background: '#fff', border: '1px solid #e9ecef' }}
            >
              <h6 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1a1a2e' }}>
                Category
              </h6>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: selectedCategory === cat ? 600 : 400,
                    background: selectedCategory === cat ? '#e8f0fe' : 'transparent',
                    color: selectedCategory === cat ? '#2a6db5' : '#4a4a4a',
                    marginBottom: '0.15rem',
                  }}
                >
                  {cat}
                </div>
              ))}

              <h6
                style={{
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  marginTop: '1.25rem',
                  color: '#1a1a2e',
                }}
              >
                Level
              </h6>
              {levels.map((lvl) => (
                <div
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: selectedLevel === lvl ? 600 : 400,
                    background: selectedLevel === lvl ? '#e8f0fe' : 'transparent',
                    color: selectedLevel === lvl ? '#2a6db5' : '#4a4a4a',
                    textTransform: 'capitalize',
                    marginBottom: '0.15rem',
                  }}
                >
                  {lvl}
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-9">
            {loading ? (
              <div className="page-loader">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p>No courses found matching your filters.</p>
              </div>
            ) : (
              <div className="row g-4">
                {courses.map((course) => (
                  <div className="col-md-6 col-xl-4" key={course._id}>
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
