import './app.style.scss'
import { Outlet } from 'react-router'
import Nav from "./components/nav/nav.jsx"
import GlobalModals from "./components/Modals/GlobalModals.jsx"

function App() {
    return (<div className="app-container">
        <header>
            <Nav/>
        </header>
        <main>
            <Outlet />
            <GlobalModals/>
        </main>
    </div>)
}

export default App