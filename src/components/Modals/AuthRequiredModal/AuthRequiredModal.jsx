import './authRequiredModal.style.scss'
import {IoCloseSharp} from "react-icons/io5"
import {useModals} from "../../../ctx/ModalsContext.jsx"
import { useLanguage } from "../../../ctx/LanguageContext.jsx"

function AuthRequiredModal({closeModal, activeModal}) {

    const [language] = useLanguage()
    const { openModal } = useModals()

    function handleOpenSignInOrSignUpModal(arg) {
        closeModal()
        openModal(arg)
    }

    return <div style={{display: activeModal ? 'flex' : 'none'}} className="auth-required-modal"
            onClick={(e)=> e.target === e.currentTarget ? closeModal() : null}>
        <div className='auth-required-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='auth-required-modal-content-container-close'>
                <IoCloseSharp onClick={closeModal} className='auth-required-modal-content-icon-close'/>
            </div>
            <p>{language.AuthRequiredModalText1} <br/>
              <span>{language.AuthRequiredModalText2}</span>
            </p>
            <div className='container-SignIn-SignUp-buttons'>
                <button className='signIn-button'
                        onClick={() => handleOpenSignInOrSignUpModal('signIn')}
                >{language.SignIn}</button>
                <button className='signUp-button'
                        onClick={() => handleOpenSignInOrSignUpModal('signUp')}
                >{language.SignUp}</button>
            </div>
        </div>
    </div>
}

export default AuthRequiredModal