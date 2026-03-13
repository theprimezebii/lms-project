import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      {course.thumbnail ? (
        <img src={course.thumbnail} alt={course.title} className="course-card-img" />
      ) : (
        <div className="course-card-img-placeholder">
          <span>&#9998;</span>
        </div>
      )}
      <div className="course-card-body">
        <span className="course-category-badge">{course.category}</span>
        <h5>{course.title}</h5>
        <p className="instructor-name">by {course.instructor?.name || 'Instructor'}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`course-price ${course.price === 0 ? 'free' : ''}`}>
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
          <Link to={`/courses/${course._id}`} className="btn btn-sm btn-outline-primary">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
