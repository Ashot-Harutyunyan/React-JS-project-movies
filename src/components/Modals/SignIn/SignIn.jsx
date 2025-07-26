import './signIn.style.scss'
import { emailLogin } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import {IoCloseSharp} from "react-icons/io5"

function SignIn({closeModal, activeModal}) {

    const [_, setUser] = useAuth()

    async function handleUserSignIn(e) {
        e.preventDefault()
        if(e.target.email.value === '' && e.target.password.value === '') return
        const { user } = await emailLogin(e.target.email.value, e.target.password.value)
        setUser(user)
        e.target.reset()
        closeModal()
    }

    return (<div style={{display: activeModal ? 'flex' : 'none'}}  className="modal-signIn">
        <div className='modal-close-container'>
            <IoCloseSharp onClick={closeModal} className='modal-close-icon'/>
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