import './layout.style.scss'
import { useState } from 'react'
import { Link } from 'react-router'

import { IoIosSearch } from "react-icons/io"
import { GoBell } from "react-icons/go"

function Layout() {

    const [memoryLanguage, setMemoryLanguage] = useState(true)

    return (<nav>
                <Link to='/' className='logo'>
                    <img src="/Movies-online-logo.jpeg" alt="" />
                </Link>

                <div className='nav-section-one'>
                    <Link to='/SearchMovies' className='link-page-search'>
                        <IoIosSearch className='search-icon'/>
                        <p>Search</p>
                    </Link>

                    <Link to='/FeaturedMovies' className='link-selected'>
                        <GoBell className='selected-icon'/>
                    </Link>

                    <div className='memory-language'
                         onClick={()=> setMemoryLanguage(!memoryLanguage)}
                    >
                        <div className='click-memory-language'>
                            <div className='GBP'
                                 style={{gridRow: memoryLanguage ? '1/2' : '2/3'}}
                            >
                                <img src="/United-Kingdom.png" alt="GBP" />
                            </div>

                            <div className='RUS'>
                                <img src="/Russia.png" alt="RUS" />
                            </div>
                        </div>
                    </div>
                </div>
    </nav>)
}

export default Layout