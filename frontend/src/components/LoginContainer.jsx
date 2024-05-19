import duck from '../assets/duck.png';
import { useState } from 'react';
import Login from "./LoginForm";
import Register from "./RegisterForm";

export default function LoginContainer() {
    const [login, setLogin] = useState(true);    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div id="container">
            <div id="login">
                <div id="login_duck">
                    <img src={duck} alt="duck"/>
                </div>
                <div id="login_form">
                    {login === true 
                        ? <Login setLogin={setLogin} showPassword={showPassword} setShowPassword={setShowPassword} /> 
                        : <Register setLogin={setLogin} showPassword={showPassword} setShowPassword={setShowPassword} />
                    }

                </div>
            </div>
        </div>
    )
  }