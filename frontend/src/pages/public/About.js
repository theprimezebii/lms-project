import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <div style={{ background: '#1a1a2e', padding: '60px 0', color: '#fff' }}>
        <div className="container">
          <h1 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>About LearnHub</h1>
          <p style={{ color: '#a8b2c0', maxWidth: 540 }}>
            A platform built for people who want to learn real skills and instructors who want
            to share their expertise.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="section-title">Our Mission</h2>
            <p className="text-muted" style={{ lineHeight: 1.8 }}>
              LearnHub was created to close the gap between traditional education and the
              skills the modern job market actually demands. We partner with working
              professionals and industry experts to deliver courses that are practical,
              current, and immediately applicable.
            </p>
            <p className="text-muted mt-3" style={{ lineHeight: 1.8 }}>
              Whether you are starting from scratch or leveling up in your career, we have a
              path for you.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {[
                { label: 'Students Enrolled', value: '12,000+' },
                { label: 'Courses Available', value: '500+' },
                { label: 'Expert Instructors', value: '200+' },
                { label: 'Course Categories', value: '20+' },
              ].map((item) => (
                <div className="col-6" key={item.label}>
                  <div
                    className="p-4 rounded text-center"
                    style={{ background: '#f4f6f9', border: '1px solid #e9ecef' }}
                  >
                    <div
                      style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a2e' }}
                    >
                      {item.value}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '0.25rem' }}>
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr />

        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <h5 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>For Students</h5>
            <p className="text-muted" style={{ lineHeight: 1.8, fontSize: '0.92rem' }}>
              Enroll in courses taught by practitioners in their fields. Track your progress,
              learn at your own pace, and build a portfolio of real skills.
            </p>
          </div>
          <div className="col-md-4">
            <h5 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>For Instructors</h5>
            <p className="text-muted" style={{ lineHeight: 1.8, fontSize: '0.92rem' }}>
              Share your knowledge and reach a global audience. Our instructor tools make it
              simple to create, organize, and publish your courses.
            </p>
          </div>
          <div className="col-md-4">
            <h5 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Our Values</h5>
            <p className="text-muted" style={{ lineHeight: 1.8, fontSize: '0.92rem' }}>
              Quality over quantity. Every course on LearnHub is reviewed to ensure it meets
              our standards for accuracy, depth, and real-world relevance.
            </p>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/courses" className="btn btn-primary px-5 py-2 me-3">
            Browse Courses
          </Link>
          <Link to="/register" className="btn btn-outline-secondary px-5 py-2">
            Join Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
