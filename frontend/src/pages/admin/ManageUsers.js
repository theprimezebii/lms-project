import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { userService } from '../../services/userService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    userService
      .getAllUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeletingId(id);
    try {
      await userService.deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-page-title">Manage Users</h1>
        <p className="dashboard-page-subtitle">
          {users.length} registered user{users.length !== 1 ? 's' : ''}
        </p>

        <div className="mb-3" style={{ maxWidth: 340 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-muted">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted">No users found.</p>
        ) : (
          <div className="data-table">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u._id}>
                    <td style={{ fontWeight: 500 }}>{u.name}</td>
                    <td style={{ fontSize: '0.88rem', color: '#4a4a4a' }}>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>{u.role}</span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {u.role !== 'admin' ? (
                        <button
                          onClick={() => handleDelete(u._id)}
                          disabled={deletingId === u._id}
                          className="btn btn-sm btn-outline-danger"
                        >
                          {deletingId === u._id ? '...' : 'Delete'}
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Protected</span>
                      )}
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

export default ManageUsers;
