import { useState } from 'react';
import axios from 'axios'
import * as authService from '../services/authService';


const AccountCreation = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username, email, password };
        try {
            const newUserResponse = await authService.signup(formData);
            props.setUser(newUserResponse.user);
            props.navigate('/');
        } catch (err) {
            props.updateMessage(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
};

export default AccountCreation;
