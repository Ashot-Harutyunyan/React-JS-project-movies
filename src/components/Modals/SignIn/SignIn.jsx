import './signIn.style.scss'
import { emailLogin } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { useLanguage } from "../../../ctx/LanguageContext.jsx"

import {IoCloseSharp } from "react-icons/io5"
import { HiMiniLockClosed } from "react-icons/hi2"
import { MdEmail } from "react-icons/md"

function SignIn({closeModal, activeModal}) {

    const [language] = useLanguage()
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
                <h2>{language.SignIn}</h2>
                <div className='form-sign-in-container-email'>
                    <div className='form-sign-in-container-icon'>
                        <MdEmail className='form-sign-in-icon'/>
                    </div>
                    <input type="email" name="email" placeholder={language.Email}/>
                </div>
                <div className='form-sign-in-container-password'>
                    <div className='form-sign-in-container-icon'>
                        <HiMiniLockClosed className='form-sign-in-icon'/>
                    </div>
                    <input type="password" name="password" placeholder={language.Password}/>
                </div>
                <input type="submit" value={language.SignIn}/>
            </form>
        </div>
    </div>)
}

export default SignIn