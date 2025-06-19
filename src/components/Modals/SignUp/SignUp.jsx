import './signUp.style.scss'
import { popUp, emailCreate } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { useModals } from "../../../ctx/ModalsContext.jsx"
import { IoCloseSharp } from "react-icons/io5"

function SignUp() {

    const [_, setUser] = useAuth()
    const [modals, handleOpenModal, handleCloseModal] = useModals()

    async function handleSignUp(e) {
        e.preventDefault()
        const { user} = await emailCreate(e.target.email.value, e.target.password.value)
        setUser(user)
        e.target.reset()
    }

    async function handleUserSignInGoogle() {
        const { user} = await popUp()
        setUser(user)
    }

    return (<div style={{display: modals.signUp ? 'flex' : 'none'}} className="modal-signUp">
        <div className='modal-close-container'>
            <IoCloseSharp onClick={handleCloseModal} className='modal-close-icon'/>
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