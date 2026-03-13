import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const updated = await authService.updateProfile(form);
      updateUser(updated);
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">My Profile</h1>
        <p className="dashboard-page-subtitle">Update your personal information</p>

        <div className="form-card">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#4e9af1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{user?.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{user?.email}</div>
              <span className={`role-badge ${user?.role}`}>{user?.role}</span>
            </div>
          </div>

          {success && <div className="alert-msg success">{success}</div>}
          {error && <div className="alert-msg error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                value={user?.email}
                disabled
                style={{ background: '#f8f9fa' }}
              />
              <small className="text-muted">Email cannot be changed.</small>
            </div>
            <div className="mb-4">
              <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                Bio
              </label>
              <textarea
                name="bio"
                className="form-control"
                rows={4}
                value={form.bio}
                onChange={handleChange}
                placeholder="Write a short bio about yourself..."
              />
            </div>
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
