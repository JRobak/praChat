import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm({ setLogin, showPassword, setShowPassword }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // console.log('Success', data);
            navigate('/');
            document.cookie = "session=" + data.session;
        } else {
            // console.log('Error', data.message);
            setError(data.message);
        }
    }

    return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength={20}/>
            <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={30}/>
            <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={30}/>
                <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "icon-eye-off" : "icon-eye"}> </i>
            </div>
            {error && <h5 style={{ color: '#d14242', padding: 0, margin: 0, paddingBottom: 10 + "px"}}>{error}</h5>}
            <input type="submit" value="Register" />
        </form>
        <p>Do you have an account? <a onClick={() => setLogin(true)}>Login</a></p>
    </>
    )
}