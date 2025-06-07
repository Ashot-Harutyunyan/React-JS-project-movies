import './signUp.style.scss'
import { popUp, emailCreate } from '../../firebase/firebase.js'

function SignUp() {

    async function handleSignUp(e) {
        e.preventDefault()
        const { user} = await emailCreate(e.target.email.value, e.target.password.value)
    }

    async function handleUserSignInGoogle() {
        const { user} = await popUp()
    }

    return (<>
        <form onSubmit={handleSignUp} className='form-sign-up'>
            <h2>Sign Up</h2>
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" value="Sign Up"/>
        </form>
        <div className='container-facebook-google-auth'>
            <div onClick={handleUserSignInGoogle}>
                <img src="/google-icon.svg" alt="Google icon"/>
                Sign in from Google account
            </div>
        </div>
    </>)
}

export default SignUp