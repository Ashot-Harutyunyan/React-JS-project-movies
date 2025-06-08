import { createContext, use, useState } from 'react'

const AuthCTX = createContext(null)

export default function AuthContext({ children }) {

    const [user, setUser] = useState(null)
    return <AuthCTX value={[user, setUser]}>{children}</AuthCTX>
}

export const useAuth = () => use(AuthCTX)