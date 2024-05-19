export default function AuthEmail() {

    return (
    <>
        <h2>Authorization with e-mail</h2>
        <form>
            <input type="email" name="email" placeholder="E-mail" />
            <input type="submit" value="Register" />
        </form>
        <p> Change E-mail <a onClick={() => setLogin(false)}>Register</a></p>
    </>
    )
}