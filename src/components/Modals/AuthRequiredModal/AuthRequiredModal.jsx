import './authRequiredModal.style.scss'
import {IoCloseSharp} from "react-icons/io5"
import {useModals} from "../../../ctx/ModalsContext.jsx"

function AuthRequiredModal({closeModal, activeModal}) {

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
            <p>Please log in to your account to continue <br/>
              <span>This action is only available to authorized users</span>
            </p>
            <div className='container-SignIn-SignUp-buttons'>
                <button className='signIn-button'
                        onClick={() => handleOpenSignInOrSignUpModal('signIn')}
                >Sign In</button>
                <button className='signUp-button'
                        onClick={() => handleOpenSignInOrSignUpModal('signUp')}
                >Sign Up</button>
            </div>
        </div>
    </div>
}

export default AuthRequiredModal