import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, doc, setDoc, arrayUnion, getDoc, updateDoc } from "firebase/firestore"
import { BASE_URL, API_KEY } from "../apiConfig.js"

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(config)
export const auth = getAuth(app)
const db = getFirestore(app)

const googleAuth = new GoogleAuthProvider(auth)
googleAuth.setCustomParameters({ prompt: 'select_account' })

export const popUp = async () => {
    return signInWithPopup(auth, googleAuth)
}

export const emailLogin = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error("Firebase error:", error.code)
        throw error.code
    }
}

export const emailCreate = async (email, password) => {
    try {
        return createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log("Firebase error:", error.code)
        throw error.code
    }
}

export const logout = async () => {
    return signOut(auth)
}

const LOCALES = ['ru-RU', 'en-US']

export const toggleFavoriteMovieAllLocales = async (movie, uid) => {
    if (!uid) return false

    const userRef = doc(db, "users", uid)
    const snap = await getDoc(userRef)

    const firstField = `favorites_${LOCALES[0]}`
    const firstFavorites = snap.exists() ? snap.data()[firstField] || [] : []
    const alreadyExists = firstFavorites.some((fav) => fav.id === movie.id)

    if (alreadyExists) {
        const updates = {}
        for (const locale of LOCALES) {
            const field = `favorites_${locale}`
            const favorites = snap.exists() ? snap.data()[field] || [] : []
            updates[field] = favorites.filter((fav) => fav.id !== movie.id)
        }
        await updateDoc(userRef, updates)
        return false
    }

    const movieDataPerLocale = await Promise.all(
        LOCALES.map(async (locale) => {
            const res = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=${locale}`)
            const data = await res.json()
            return { locale, data }
        })
    )

    const newFields = {}
    for (const { locale, data } of movieDataPerLocale) {
        newFields[`favorites_${locale}`] = arrayUnion(data)
    }
    await setDoc(userRef, newFields, { merge: true })

    return true
}

export const getFavoritesArray = async (locale, uid) => {
    if (!uid) return []

    const snap = await getDoc(doc(db, "users", uid))
    if (!snap.exists()) return []

    const field = `favorites_${locale}`
    return snap.data()[field] || []
}