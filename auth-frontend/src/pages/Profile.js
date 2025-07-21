import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>User Profile</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {user.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginBottom: '20px'
              }}
            />
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Name:</strong>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginTop: '5px'
          }}>
            {user.name}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Email:</strong>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginTop: '5px'
          }}>
            {user.email}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Authentication Provider:</strong>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginTop: '5px'
          }}>
            <span style={{
              padding: '4px 8px',
              backgroundColor: user.authProvider === 'google' ? '#4285f4' : '#28a745',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {user.authProvider.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Email Verified:</strong>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginTop: '5px'
          }}>
            <span style={{
              padding: '4px 8px',
              backgroundColor: user.isEmailVerified ? '#28a745' : '#dc3545',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {user.isEmailVerified ? 'VERIFIED' : 'NOT VERIFIED'}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>User ID:</strong>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginTop: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            {user.id}
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;