import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role);
      if (user.role === 'instructor') navigate('/instructor/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="auth-subtitle">Join LearnHub and start learning today</p>

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
              placeholder="Your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
              I want to join as
            </label>
            <div className="d-flex gap-3">
              {['student', 'instructor'].map((role) => (
                <label
                  key={role}
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: 'pointer', fontSize: '0.9rem', textTransform: 'capitalize' }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={handleChange}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-4" style={{ fontSize: '0.88rem', color: '#6c757d' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4e9af1', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
