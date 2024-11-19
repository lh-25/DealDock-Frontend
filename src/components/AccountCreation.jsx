import { useState } from 'react';
import * as authService from '../services/authService';
import { useNavigate }  from 'react-router-dom';



const AccountCreation = (props) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState([''])

    const updateMessage = (msg) => {
        setMessage(msg);
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username, password };
        try {
            const newUserResponse = await authService.signup(formData);
            props.setUser(newUserResponse.user);
            navigate('/login');
        } catch (err) {
            updateMessage(err.message);
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
