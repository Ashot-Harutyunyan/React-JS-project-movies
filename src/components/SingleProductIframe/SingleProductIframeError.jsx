import {useLanguage} from "../../ctx/LanguageContext.jsx"

function SingleProductIframeError({error}) {

    const [language] = useLanguage()

    return <div className="single-product-iframe-error-container">
        <h3 className='single-product-iframe-error-title'>{language.pageErrorTitleVideo}</h3>
        <p className="single-product-iframe-error-message">{error}</p>
    </div>
}

export default SingleProductIframeError