import './signUp.style.scss'
import { useState } from "react"
import { popUp, emailCreate } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { useLanguage } from "../../../ctx/LanguageContext.jsx"

import { IoCloseSharp } from "react-icons/io5"
import {MdEmail} from "react-icons/md"
import {HiMiniLockClosed} from "react-icons/hi2"

function SignUp({closeModal, activeModal}) {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [language] = useLanguage()
    const [_, setUser, error, setError, getAuthErrorMessage] = useAuth()

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSignUp(e) {
        e.preventDefault()
        if (!inputs.email || !inputs.password) return
        try {
            const { user} = await emailCreate(inputs.email, inputs.password)
            setUser(user)
            setInputs({email: "", password: ""})
            closeModal()
            setError(null)
        } catch (errorCode) {
            setError(getAuthErrorMessage(errorCode, language.url))
        }
    }

    async function handleUserSignInGoogle() {
        const { user} = await popUp()
        setUser(user)
        closeModal()
        setInputs({email: "", password: ""})
        setError(null)
    }

    return (<div style={{display: activeModal ? 'flex' : 'none'}} className="modal-signUp">
        <div className='modal-close-container'>
            <IoCloseSharp onClick={()=>{
                closeModal()
                setInputs({email: "", password: ""})
                setError(null)
            }} className='modal-close-icon'/>
        </div>
        <div className='modal-signUp-content'>
            <form onSubmit={handleSignUp} className='form-sign-up'>
                <h2>{language.SignUp}</h2>
                <div className={error ? 'form-sign-up-container-email error-input-border' : 'form-sign-up-container-email'}>
                    <div className='form-sign-up-container-icon'>
                        <MdEmail className='form-sign-up-icon'/>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder={language.Email}
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={error ? 'form-sign-up-container-password error-input-border' : 'form-sign-up-container-password'}>
                    <div className='form-sign-up-container-icon'>
                        <HiMiniLockClosed className='form-sign-up-icon'/>
                    </div>
                    <input
                        type="password"
                        name="password"
                        placeholder={language.Password}
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </div>
                <p className={error ? 'error-sign-in-message' : 'error-sign-in-message hidden'}>{error}</p>
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