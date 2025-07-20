import SignIn from "./SignIn/SignIn.jsx"
import SignUp from "./SignUp/SignUp.jsx"
import {useModals} from "../../ctx/ModalsContext.jsx"

function Modals() {

    const {dialogRef, activeModal, closeModal} = useModals()

    return (<dialog ref={dialogRef}>
        <SignIn closeModal={closeModal} activeModal={activeModal.signIn}/>
        <SignUp closeModal={closeModal} activeModal={activeModal.signUp}/>
    </dialog>)
}

export default Modals