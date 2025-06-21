import './app.style.scss'
import { Outlet } from 'react-router'
import Layout from "./components/Layout/Layout.jsx"
import Modals from "./components/Modals/Modals.jsx"

function App() {
    return (<>
        <Modals/>
        <header>
            <Layout/>
        </header>
        <main>
            <Outlet />
        </main>
    </>)
}

export default App