import './queryTextError.style.scss'
import {useLanguage} from "../../ctx/LanguageContext.jsx"

function QueryTextError({title, message}) {

    const [language] = useLanguage()

    return <div className="query-text-error-container">
        <h3 className='query-text-error-title'>{language[title]}</h3>
        <p className="query-text-error-message">{message}</p>
    </div>
}

export default QueryTextError