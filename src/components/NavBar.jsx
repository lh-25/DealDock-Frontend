import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const NavBar = ({ user, handleLogout }) => {
  const navigate = useNavigate()
  
  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/login')
  }
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/Shop">Shop</Link>
        <Link to="/products">Products</Link>
        <Link to={'products/new'}>New Product</Link>
        <Link to='my-products'>My Products List</Link>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button className="logout-button" onClick={handleLogoutAndRedirect}>
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
