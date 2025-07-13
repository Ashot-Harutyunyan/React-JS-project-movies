import './app.style.scss'
import { Outlet } from 'react-router'
import Nav from "./components/nav/nav.jsx"
import Modals from "./components/Modals/Modals.jsx"

function App() {
    return (<>
        <Modals/>
        <header>
            <Nav/>
        </header>
        <main>
            <Outlet />
        </main>
    </>)
}

export default App