import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear tokens from LocalStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Perform any other logout-related actions (e.g., redirect to login page)
    // ...
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;