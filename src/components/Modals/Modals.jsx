import SignIn from "./SignIn/SignIn.jsx"
import SignUp from "./SignUp/SignUp.jsx"
import {useModals} from "../../ctx/ModalsContext.jsx"

function Modals() {

    const [modals, _, handleCloseModal] = useModals()

    return (<>
        <SignIn modalsSignIn={modals.signIn} handleCloseModal={handleCloseModal}/>
        <SignUp modalsSignUp={modals.signUp} handleCloseModal={handleCloseModal}/>
    </>);
}

export default Modals;