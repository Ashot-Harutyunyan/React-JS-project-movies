import { createContext, use, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'

const AuthCTX = createContext(null)

export default function AuthContext({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null)
        })
        return () => unsubscribe()
    }, [])

    return <AuthCTX value={[user, setUser]}>{children}</AuthCTX>
}

export const useAuth = () => use(AuthCTX)