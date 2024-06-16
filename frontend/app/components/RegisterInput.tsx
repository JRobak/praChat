'use client'

import React, {FormEvent, useState} from 'react'
import Link from "next/link";

interface RegisterInputProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterInput: React.FC<RegisterInputProps> = ({setLogin}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");

        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength={20}/>
                <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={30}/>
                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "icon-eye-off" : "icon-eye"} />
                </div>
                {error && (
                    <h5 style={{color: '#d14242', padding: 0, margin: 0, paddingBottom: '10px'}}>
                        {error}
                    </h5>
                )}
                <input type="submit" value="Register"/>
            </form>
            <p> Do you have an account? <a onClick={() => setLogin(true)}>Login</a></p>
        </>
    )
}

export default RegisterInput