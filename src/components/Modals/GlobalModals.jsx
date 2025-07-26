import SignIn from "./SignIn/SignIn.jsx"
import SignUp from "./SignUp/SignUp.jsx"
import AuthRequiredModal from "./AuthRequiredModal/AuthRequiredModal.jsx"
import {useModals} from "../../ctx/ModalsContext.jsx"

function GlobalModals() {

    const {dialogRef, activeModal, closeModal} = useModals()

    return (<dialog ref={dialogRef}>
        <SignIn closeModal={closeModal} activeModal={activeModal.signIn}/>
        <SignUp closeModal={closeModal} activeModal={activeModal.signUp}/>
        <AuthRequiredModal closeModal={closeModal} activeModal={activeModal.authRequiredModal}/>
    </dialog>)
}

export default GlobalModals