import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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