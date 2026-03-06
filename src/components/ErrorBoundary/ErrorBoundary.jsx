import './errorBoundary.style.scss'
import {useRouteError, isRouteErrorResponse, Link} from 'react-router'
import ErrorBoundaryAnimation from "./ErrorBoundaryAnimation.jsx"
import {useLanguage} from "../../ctx/LanguageContext.jsx"

function ErrorBoundary(){

    const error = useRouteError()
    const [language] = useLanguage()

    const {status, message} = error

    function getErrorDisplayContent(error, status){
        const knownStatuses = [404, 401, 503]
        if(isRouteErrorResponse(error) && knownStatuses.includes(status)){
            return {
                errorTitle: language[`error${status}`], 
                errorText: language[`error${status}message`]
            }
        }
        return {
            errorTitle: language.unknownErrorTitle, 
            errorText: message || language.unknownErrorMessage
        }
    }

    const {errorTitle, errorText} = getErrorDisplayContent(error, status)

    return <div className='container-error-boundary'>
        <h1 className='error-boundary-title'>{errorTitle}</h1>
        <p className='error-boundary-message'>{errorText}</p>
        <ErrorBoundaryAnimation/>
        {status !== 503 && <Link to="/" className="error-boundary-link-back">{language.errorLinkBackText}</Link>}
    </div>
}

export default ErrorBoundary