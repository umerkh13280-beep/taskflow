import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          TaskFlow
        </Link>
        <div className="d-flex align-items-center gap-3">
          {user && (
            <>
              <span className="text-white opacity-75">
                {user.name}
              </span>
              <button
                className="btn btn-outline-light btn-sm px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;