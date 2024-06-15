'use client'

import React, {useState} from 'react'
import LoginInput from "@/app/components/LoginInput";
import RegisterInput from "@/app/components/RegisterInput";
import './login.css'

const LoginPage = () => {
    const [login, setLogin] = useState(true);

    return (
        <>
            <div id="container">
                <div id="login">
                    <div id="login_duck">
                        <img src={'/duck.png'} alt="duck"/>
                    </div>
                    <div id="login_form">
                        {login ? <LoginInput setLogin={setLogin} /> : <RegisterInput setLogin={setLogin} /> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage