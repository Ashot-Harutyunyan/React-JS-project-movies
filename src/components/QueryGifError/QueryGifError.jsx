import './queryGifError.style.scss'
import React from 'react'
import {useLanguage} from "../../ctx/LanguageContext.jsx"

function QueryGifError({title, message}) {

    const [language] = useLanguage()

    return (<>
        <div className="container-page-error">
            <img className="container-page-error-gif" src="../../../public/error.gif" alt="error gif"/>
            <div className="container-page-error-title-message">
                <h2 className="error-boundary-title">{language[title]}</h2>
                <p className="error-boundary-message">{message.toLowerCase()}</p>
            </div>
        </div>
    </>)
}

export default QueryGifError