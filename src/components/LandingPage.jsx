import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as authService from '../services/authService'
import './LandingPage.css'

export default function LandingPage({ setUser }) {
  const navigate = useNavigate()
  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const updateMessage = (msg) => {
    setMessage(msg)
  }

  const handleChange = (e) => {
    updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await authService.signin(formData)
      setUser(user)
      navigate('/shop')
    } catch (err) {
      updateMessage(err.message)
    }
  }

  return (
    <main className="login">
        <h2>Log In</h2>
        <p>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="login-button">Log In</button>
            <Link to="/">
              <button className="cancel-button">Cancel</button>
            </Link>
            <Link to={'/AccountCreation'}>Create an Account</Link>
          </div>
        </form>

    </main>
  )
}