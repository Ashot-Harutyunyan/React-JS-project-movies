import { createContext, use, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'

const AuthCTX = createContext(null)

export default function AuthContext({ children }) {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const getAuthErrorMessage = (errorCode, language) => {
        const isEN = language === 'en-US'
        const messages = {
            "auth/wrong-password": isEN ? "Incorrect password" : "Неверный пароль",
            "auth/user-not-found": isEN ? "User not found" : "Пользователь не найден",
            "auth/email-already-in-use": isEN ? "This email is already registered" : "Этот email уже зарегистрирован",
            "auth/weak-password": isEN ? "Password is too weak" : "Пароль слишком слабый",
            "auth/invalid-email": isEN ? "Incorrect email format" : "Неверный формат email"
        }
        return messages[errorCode] || (
            isEN
                ? "Something went wrong. Try again later"
                : "Что-то пошло не так. Попробуй позже"
        )
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null)
            setAuthLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (<AuthCTX value={[user, setUser, error, setError, getAuthErrorMessage, authLoading]}>{children}</AuthCTX>)
}

export const useAuth = () => use(AuthCTX)