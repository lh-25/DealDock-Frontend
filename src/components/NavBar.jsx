import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../components/navBar.css"

const NavBar = ({ user, handleLogout }) => {
  const navigate = useNavigate()

  const handleLogoutAndRedirect = () => {
    handleLogout()
    navigate('/login')
  };



  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/Shop">
          <img src="public/deal-dock-logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/Shop">Shop</Link>
        <Link to="/products">Products</Link>
        {user ? (
          <div className="welcome-message">
            <span>Welcome, {user?.username}!</span>
            <button className="logout-button" onClick={handleLogoutAndRedirect}>
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
