import './app.style.scss'
import GlobalModals from "./components/Modals/GlobalModals.jsx"
import  ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx"
import Header from "./components/Header/Header.jsx"
import Main from "./components/Main/Main.jsx"

function App() {
    return (<>
        <Header />
        <Main />
        <ScrollToTop />
        <GlobalModals />
    </>)
}

export default App