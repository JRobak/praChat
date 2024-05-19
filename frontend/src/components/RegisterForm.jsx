export default function RegisterForm({ setLogin, showPassword, setShowPassword }) {

    return (
    <>
        <h1>Register</h1>
        <form>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="E-mail" />
            <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="off" />
                <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "icon-eye-off" : "icon-eye"}> </i>
            </div>
            <input type="submit" value="Register" />
        </form>
        <p>Do you have an account? <a onClick={() => setLogin(true)}>Login</a></p>
    </>
    )
}