import './app.style.scss'
import { Outlet } from 'react-router'
import Layout from "./components/Layout/Layout.jsx";

function App() {
    return (<>
        <header>
            <Layout/>
        </header>
        <main>
            <Outlet />
        </main>
    </>)
}

export default App