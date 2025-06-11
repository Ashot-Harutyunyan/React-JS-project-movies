import './signIn.style.scss'
import { emailLogin } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { useModals } from "../../../ctx/ModalsContext.jsx"
import {IoCloseSharp} from "react-icons/io5"

function SignIn() {

    const [_, setUser] = useAuth()
    const [modals, handleOpenModal, handleCloseModal] = useModals()

    async function handleUserSignIn(e) {
        e.preventDefault()
        const { user } = await emailLogin(e.target.email.value, e.target.password.value)
        setUser(user)
        e.target.reset()
    }

    return (<div style={{display: modals.signIn ? 'flex' : 'none'}}  className="modal-signIn">
        <div className='modal-close-container'>
            <IoCloseSharp onClick={handleCloseModal} className='modal-close-icon'/>
        </div>
        <div className='modal-signIn-content'>
            <form onSubmit={handleUserSignIn} className="form-sign-in">
                <h2>Sign In</h2>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="Sign In"/>
            </form>
        </div>
    </div>)
}

        export default SignIn