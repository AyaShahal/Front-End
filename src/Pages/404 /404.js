import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Page not found.</p>
      <Link to="/" className="not-found-link">Go back to Home page</Link>
    </div>
  );
}

export default NotFound;