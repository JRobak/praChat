'use client'

import React, {FormEvent, useState} from 'react'

interface LoginInputProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginInput: React.FC<LoginInputProps> = ({setLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/home';
        } else {
            setError(data.message);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "icon-eye-off" : "icon-eye"}/>
                </div>
                {error && (
                    <h5 style={{color: '#d14242', padding: 0, margin: 0, paddingBottom: '10px'}}>
                        {error}
                    </h5>
                )}
                <input type="submit" value="Login"/>
            </form>
            <p> Don't have an account? <a onClick={() => setLogin(false)}>Register</a> </p>
        </>
    )
}

export default LoginInput