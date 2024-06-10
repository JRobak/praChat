import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setLogin, showPassword, setShowPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            document.cookie = "session=" + encodeURIComponent(data.session);
            navigate('/');
        } else {
            setError(data.message);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        onClick={() => setShowPassword(!showPassword)}
                        className={showPassword ? "icon-eye-off" : "icon-eye"}
                    />
                </div>
                {error && (
                    <h5 style={{ color: '#d14242', padding: 0, margin: 0, paddingBottom: '10px' }}>
                        {error}
                    </h5>
                )}
                <input type="submit" value="Login" />
            </form>
            <p>
                Don't have an account? <a onClick={() => setLogin(false)}>Register</a>
            </p>
        </>
    );
}
