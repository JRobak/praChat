import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setLogin, showPassword, setShowPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // console.log('Success', data);
            // localStorage.setItem('id', data.user['user_id']);
            document.cookie = "session=" + data.session;
            navigate('/');
        } else {
            // console.log('Error', data.message);
            setError(data.message);
        }
    }

    return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
            <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "icon-eye-off" : "icon-eye"}> </i>
            </div>
            {error && <h5 style={{ color: '#d14242', padding: 0, margin: 0, paddingBottom: 10 + "px"}}>{error}</h5>}
            <input type="submit" value="Login"/> 
        </form>
        <p> Don't have an account? <a onClick={() => setLogin(false)}>Register</a></p>
    </>
    )
}