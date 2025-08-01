import './signUp.style.scss'
import { popUp, emailCreate } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { IoCloseSharp } from "react-icons/io5"

function SignUp({closeModal, activeModal}) {

    const [_, setUser] = useAuth()

    async function handleSignUp(e) {
        e.preventDefault()
        if(e.target.email.value === '' && e.target.password.value === '') return
        const { user} = await emailCreate(e.target.email.value, e.target.password.value)
        setUser(user)
        e.target.reset()
        closeModal()
    }

    async function handleUserSignInGoogle() {
        const { user} = await popUp()
        setUser(user)
    }

    return (<div style={{display: activeModal ? 'flex' : 'none'}} className="modal-signUp">
        <div className='modal-close-container'>
            <IoCloseSharp onClick={closeModal} className='modal-close-icon'/>
        </div>
        <div className='modal-signUp-content'>
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
        </div>
    </div>)
}

export default SignUp