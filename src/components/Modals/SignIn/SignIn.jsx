import './signIn.style.scss'
import { useState } from "react"
import { emailLogin } from '../../../firebase/firebase.js'
import { useAuth } from "../../../ctx/AuthContext.jsx"
import { useLanguage } from "../../../ctx/LanguageContext.jsx"

import {IoCloseSharp } from "react-icons/io5"
import { HiMiniLockClosed } from "react-icons/hi2"
import { MdEmail } from "react-icons/md"

function SignIn({closeModal, activeModal}) {

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

    async function handleUserSignIn(e) {
        e.preventDefault()
        if (!inputs.email || !inputs.password) return
        try {
            const { user } = await emailLogin(inputs.email, inputs.password)
            setUser(user)
            setInputs({email: "", password: ""})
            closeModal()
            setError(null)
        } catch (errorCode) {
            setError(getAuthErrorMessage(errorCode, language.url))
        }
    }

    return (<div style={{display: activeModal ? 'flex' : 'none'}}  className="modal-signIn">
        <div className='modal-close-container'>
            <IoCloseSharp onClick={()=>{
                closeModal()
                setInputs({email: "", password: ""})
                setError(null)
            }} className='modal-close-icon'/>
        </div>
        <div className='modal-signIn-content'>
            <form onSubmit={handleUserSignIn} className="form-sign-in">
                <h2>{language.SignIn}</h2>
                <div className={error ? 'form-sign-in-container-email error-input-border' : 'form-sign-in-container-email'}>
                    <div className='form-sign-in-container-icon'>
                        <MdEmail className='form-sign-in-icon'/>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder={language.Email}
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={error ? 'form-sign-in-container-password error-input-border' : 'form-sign-in-container-password'}>
                    <div className='form-sign-in-container-icon'>
                        <HiMiniLockClosed className='form-sign-in-icon'/>
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
                <input type="submit" value={language.SignIn}/>
            </form>
        </div>
    </div>)
}

export default SignIn