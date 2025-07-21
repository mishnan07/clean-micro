import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '651288837156-fpcpbqdot3e540raueo1ifi9mmvise4k.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
        }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      await googleLogin(response.credential);
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed. Please try again.');
    }
  };

  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleLoginButton;