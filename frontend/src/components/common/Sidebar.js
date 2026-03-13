import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Sidebar links with Bootstrap Icons
const studentLinks = [
  { path: '/student/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/student/my-courses', label: 'My Courses', icon: 'bi-journal-bookmark' },
  { path: '/student/profile', label: 'Profile', icon: 'bi-person' },
  { path: '/courses', label: 'Browse Courses', icon: 'bi-search' },
];

const instructorLinks = [
  { path: '/instructor/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/instructor/create-course', label: 'Create Course', icon: 'bi-plus-circle' },
  { path: '/instructor/manage-courses', label: 'My Courses', icon: 'bi-journal-bookmark' },
];

const adminLinks = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/admin/users', label: 'Manage Users', icon: 'bi-people' },
  { path: '/admin/courses', label: 'Manage Courses', icon: 'bi-journal-bookmark' },
  { path: '/admin/analytics', label: 'Analytics', icon: 'bi-bar-chart-line' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links =
    user?.role === 'admin'
      ? adminLinks
      : user?.role === 'instructor'
      ? instructorLinks
      : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="dashboard-sidebar">
      {/* User Info */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="sidebar-user-name">{user?.name}</div>
        <div className="sidebar-user-role">{user?.role}</div>
      </div>

      {/* Navigation Links */}
      <ul className="sidebar-nav">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className={`nav-icon bi ${link.icon}`} />
              {link.label}
            </NavLink>
          </li>
        ))}

        {/* Logout */}
        <li
          style={{
            marginTop: '1rem',
            borderTop: '1px solid #2d2d4e',
            paddingTop: '1rem',
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              padding: '0.65rem 1.3rem',
              color: '#c9d1d9',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
            }}
          >
            <i className="nav-icon bi bi-box-arrow-right"></i>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;