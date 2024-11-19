import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/Shop">Shop</Link>
        <Link to="/products">Products</Link>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button className="logout-button" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
