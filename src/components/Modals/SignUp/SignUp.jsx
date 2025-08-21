import './signUp.style.scss'
import { popUp, emailCreate } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { useLanguage } from "../../../ctx/LanguageContext.jsx"

import { IoCloseSharp } from "react-icons/io5"
import {MdEmail} from "react-icons/md"
import {HiMiniLockClosed} from "react-icons/hi2"

function SignUp({closeModal, activeModal}) {

    const [_, setUser] = useAuth()
    const [language] = useLanguage()

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
                <h2>{language.SignUp}</h2>
                <div className='form-sign-up-container-email'>
                    <div className='form-sign-up-container-icon'>
                        <MdEmail className='form-sign-up-icon'/>
                    </div>
                    <input type="email" name="email" placeholder={language.Email}/>
                </div>
                <div className='form-sign-up-container-password'>
                    <div className='form-sign-up-container-icon'>
                        <HiMiniLockClosed className='form-sign-up-icon'/>
                    </div>
                    <input type="password" name="password" placeholder={language.Password}/>
                </div>
                <input type="submit" value={language.SignUp}/>
            </form>
            <div className='container-facebook-google-auth'>
                <div onClick={handleUserSignInGoogle}>
                    <img src="/google-icon.svg" alt="Google icon"/>
                    {language.GoogleAccount}
                </div>
            </div>
        </div>
    </div>)
}

export default SignUp