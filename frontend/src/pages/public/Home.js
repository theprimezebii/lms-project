import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import CourseCard from '../../components/common/CourseCard';

const categories = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Dev'];

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService
      .getAllCourses()
      .then((data) => setCourses(data.slice(0, 6)))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>
                Build Real Skills with <span>Expert-Led</span> Courses
              </h1>
              <p>
                Join thousands of learners growing their careers through hands-on, practical
                courses taught by working professionals.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/courses" className="btn btn-primary px-4 py-2">
                  Browse Courses
                </Link>
                <Link to="/register" className="btn btn-outline-light px-4 py-2">
                  Get Started Free
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <h3>500+</h3>
                  <p>Courses</p>
                </div>
                <div className="hero-stat">
                  <h3>12k+</h3>
                  <p>Students</p>
                </div>
                <div className="hero-stat">
                  <h3>200+</h3>
                  <p>Instructors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Find courses in the topics that matter most to you</p>
          <div className="row g-3">
            {categories.map((cat) => (
              <div className="col-6 col-md-4 col-lg-2" key={cat}>
                <Link
                  to={`/courses?category=${cat}`}
                  className="d-block text-center p-3 rounded border text-decoration-none"
                  style={{
                    background: '#f8f9fa',
                    color: '#1a1a2e',
                    fontWeight: 500,
                    fontSize: '0.88rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1a1a2e';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.color = '#1a1a2e';
                  }}
                >
                  {cat}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="section-title mb-0">Featured Courses</h2>
            <Link to="/courses" className="btn btn-sm btn-outline-primary">
              View All
            </Link>
          </div>
          <p className="section-subtitle">Handpicked courses to get you started</p>

          {loading ? (
            <div className="page-loader">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p>No courses available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="row g-4">
              {courses.map((course) => (
                <div className="col-md-6 col-lg-4" key={course._id}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="section-title">Ready to start learning?</h2>
          <p className="text-muted mb-4">
            Create your free account and access hundreds of courses today.
          </p>
          <Link to="/register" className="btn btn-primary px-5 py-2">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
