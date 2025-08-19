import { createContext, use, useState } from "react"
import { english, russia } from "../language.js";

const LanguageCTX = createContext(english)

export default function LanguageContext({ children }) {
    const [language, setLanguage] = useState(english)

    function handleLanguage(){
        if(language.url === 'en-US') setLanguage(russia)
        else setLanguage(english)
    }

    return <LanguageCTX value={[language, handleLanguage]}>{children}</LanguageCTX>
}

export const useLanguage = () => use(LanguageCTX)