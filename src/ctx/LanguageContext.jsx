import { createContext, use, useState } from "react"

const english = {
    url: 'language=en-US',
    homePage: 'Watch all',
}

const russia = {
    url: 'language=ru-RU',
    homePage: 'Смотреть все',
}

const LanguageCTX = createContext(english)

export default function LanguageContext({ children }) {
    const [language, setLanguage] = useState(english)

    function handleLanguage(){
        if(language.url === 'language=en-US') setLanguage(russia)
        else setLanguage(english)
    }

    return <LanguageCTX value={[language, handleLanguage]}>{children}</LanguageCTX>
}

export const useLanguage = () => use(LanguageCTX)