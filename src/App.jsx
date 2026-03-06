import './app.style.scss'
import { Outlet } from 'react-router'
import Nav from "./components/nav/nav.jsx"
import GlobalModals from "./components/Modals/GlobalModals.jsx"
import  ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx"

function App() {
    return (<>
        <header>
            <Nav/>
        </header>
        <main>
            <ScrollToTop />
            <Outlet />
            <GlobalModals/>
        </main>
    </>)
}

export default App