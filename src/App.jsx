import './app.style.scss'
import { Outlet } from 'react-router'
import Nav from "./components/nav/nav.jsx"
import Modals from "./components/Modals/Modals.jsx"

function App() {
    return (<div className="app-container">
        <header>
            <Nav/>
        </header>
        <main>
            <Outlet />
            <Modals/>
        </main>
    </div>)
}

export default App