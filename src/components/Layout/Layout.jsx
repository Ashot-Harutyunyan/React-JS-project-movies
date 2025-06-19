import './layout.style.scss'
import { useState } from 'react'
import { Link } from 'react-router'
import { logout } from '../../firebase/firebase.js'
import { useAuth } from "../../ctx/AuthContext.jsx"
import { useModals } from "../../ctx/ModalsContext.jsx"

import { IoIosSearch } from "react-icons/io"
import { GoBell } from "react-icons/go"

function Layout() {

    const [memoryLanguage, setMemoryLanguage] = useState(true)
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [user, setUser] = useAuth()
    const [_, handleOpenModal] = useModals()

    return (<nav className={burgerMenu ? 'active' : ''}>
        <Link to='/' className='logo'>
            <img src="/Movies-online-logo.jpeg" alt=""/>
        </Link>

        <div className={burgerMenu ? "burger-menu active" : "burger-menu"}
             onClick={() => setBurgerMenu(!burgerMenu)}>
            <span className="top"></span>
            <span className="middle"></span>
            <span className="bottom"></span>
        </div>


        <section className='nav-section'>
            <Link to='SearchMovies' className='link-page-search'>
                <IoIosSearch className='search-icon'/>
                <p>Search</p>
            </Link>

            <div className='nav-section-language-and-icon'>
                <Link to='FeaturedMovies' className='link-selected'>
                    <GoBell className='selected-icon'/>
                </Link>

                <div className='memory-language'
                     onClick={() => setMemoryLanguage(!memoryLanguage)}
                >
                    <div className='click-memory-language'>
                        <div className='GBP'
                             style={{gridRow: memoryLanguage ? '1/2' : '2/3'}}
                        >
                            <img src="/United-Kingdom.png" alt="GBP"/>
                        </div>

                        <div className='RUS'>
                            <img src="/Russia.png" alt="RUS"/>
                        </div>
                    </div>
                </div>
            </div>

            {!user ? <div className='container-SignIn-SignUp-links'>
                    <button className='signIn-signUp-button' onClick={() => handleOpenModal('signIn')}>Sign In</button>
                    <button className='signIn-signUp-button' onClick={() => handleOpenModal('signUp')}>Sign Up</button>
                </div>
                : <button className='button-logout' onClick={async () => {
                    await logout()
                    setUser(null)
                }}>Logout</button>}
        </section>
    </nav>)
}

export default Layout