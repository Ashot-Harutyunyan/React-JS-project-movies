import './signIn.style.scss'
import { emailLogin } from '../../firebase/firebase.js'

function SignIn() {

    async function handleUserSignIn(e) {
        e.preventDefault()
        const { user } = await emailLogin(e.target.email.value, e.target.password.value)
    }

    return (<form onSubmit={handleUserSignIn} className="form-sign-in">
            <h2>Sign In</h2>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Sign In" />
    </form>)
}

export default SignIn