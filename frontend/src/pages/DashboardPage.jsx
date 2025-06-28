
import React from 'react';
import { useAuth } from '../auth';
import { LogOut, UserCircle } from 'lucide-react';
import '../styles/dashboard.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Retentify</h1>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="profile-card">
          <div className="profile-header">
            <UserCircle size={80} className="profile-icon" />
            <h2 className="profile-name">{user?.full_name}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <strong>Role:</strong> {user?.role || 'Not specified'}
            </div>
            <div className="detail-item">
              <strong>Company:</strong> {user?.company_name || 'Not specified'}
            </div>
            <div className="detail-item">
              <strong>Phone:</strong> {user?.phone_number || 'Not specified'}
            </div>
            <div className="detail-item">
              <strong>Member since:</strong>{' '}
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
            </div>
            {user?.last_login && (
              <div className="detail-item">
                <strong>Last login:</strong>{' '}
                {new Date(user.last_login).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Analytics</h3>
            <p>View your customer retention metrics and insights.</p>
          </div>
          <div className="feature-card">
            <h3>Campaigns</h3>
            <p>Create and manage retention campaigns.</p>
          </div>
          <div className="feature-card">
            <h3>Reports</h3>
            <p>Generate detailed retention reports.</p>
          </div>
          <div className="feature-card">
            <h3>Settings</h3>
            <p>Configure your account and preferences.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;