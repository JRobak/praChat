export default function LoginForm({ setLogin, showPassword, setShowPassword }) {

    return (
    <>
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="E-mail" />
            <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="off" />
                <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "icon-eye-off" : "icon-eye"}> </i>
            </div>
            <input type="submit" value="Login" />
        </form>
        <p> Don't have an account? <a onClick={() => setLogin(false)}>Register</a></p>
    </>
    )
}