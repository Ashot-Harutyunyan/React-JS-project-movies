import './app.style.scss'
import { Outlet } from 'react-router'
import Layout from "./components/Layout/Layout.jsx"
import SignIn from "./components/Modals/SignIn/SignIn.jsx";
import SignUp from "./components/Modals/SignUp/SignUp.jsx";

function App() {
    return (<>
        <SignIn/>
        <SignUp/>
        <header>
            <Layout/>
        </header>
        <main>
            <Outlet />
        </main>
    </>)
}

export default App