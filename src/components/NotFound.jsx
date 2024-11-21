import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/Shop">Go back to Shop</Link>
      </div>
    </div>
  )
}

export default NotFound
