import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios
      .get('/protected')
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
  }, []);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/productList">Shop</Link>
      <Link to="/Dashboard">Dashboard</Link>
      {!isAuthenticated && <Link to="/AccountCreation">Account Creation</Link>}
    </nav>
  )
}

export default Nav
