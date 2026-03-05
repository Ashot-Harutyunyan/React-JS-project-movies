import './errorBoundary.style.scss'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router'
import ErrorBoundaryAnimation from "./ErrorBoundaryAnimation.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"

function ErrorBoundary() {

    const error = useRouteError()
    const [language] = useLanguage()

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <div className='container-error-boundary'>
                    <h1 className='error-boundary-title'>{language.error404}</h1>
                    <p className='error-boundary-message'>{language.error404message}</p>
                    <ErrorBoundaryAnimation />
                    <Link to="/" className="error-boundary-link-back">{language.errorLinkBackText}</Link>
            </div>
        }

        if (error.status === 401) {
            return <div className='container-error-boundary'>
                    <h1 className='error-boundary-title'>{language.error401}</h1>
                    <p className='error-boundary-message'>{language.error401message}</p>
                    <ErrorBoundaryAnimation />
                    <Link to="/" className="error-boundary-link-back">{language.errorLinkBackText}</Link>
            </div>
        }

        if (error.status === 503) {
            return <div className='container-error-boundary'>
                    <h1 className='error-boundary-title'>{language.error503}</h1>
                    <p className='error-boundary-message'>{language.error503message}</p>
                    <ErrorBoundaryAnimation />
            </div>
        }
    }

    return <div className='container-error-boundary'>
            <h1 className='error-boundary-title'>{language.unknownErrorTitle}</h1>
            <p className='error-boundary-message'>{error?.message || language.unknownErrorMessage}</p>
            <ErrorBoundaryAnimation />
            <Link to="/" className="error-boundary-link-back">{language.errorLinkBackText}</Link>
    </div>
}

export default ErrorBoundary