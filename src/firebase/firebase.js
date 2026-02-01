import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, doc, setDoc, arrayUnion, getDoc, updateDoc } from "firebase/firestore"

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
googleAuth.setCustomParameters({
    prompt: 'select_account'
})

export const popUp = async () => {
    return signInWithPopup(auth, googleAuth)
}

export const emailLogin = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch(error) {
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

export const toggleFavoriteMovie = async (movie) => {
    const user = auth.currentUser
    if (!user) return false

    const userRef = doc(db, "users", user.uid)
    const snap = await getDoc(userRef)

    const favorites = snap.exists() ? snap.data().favorites || [] : []

    const alreadyExists = favorites.some(
        (fav) => fav.id === movie.id
    )

    if (alreadyExists) {
        console.log("The film is already in your favorites")
        deleteFavoriteMovie(movie.id)
        return false
    }

    await setDoc(
        userRef,
        { favorites: arrayUnion(movie) },
        { merge: true }
    )

    return true
}

async function deleteFavoriteMovie(movieId) {
    const user = auth.currentUser
    if (!user) return false

    try {
        const userRef = doc(db, "users", user.uid)
        const snap = await getDoc(userRef)

        if (!snap.exists()) return false

        const favorites = snap.data().favorites || []

        const updatedFavorites = favorites.filter(
            (movie) => movie.id !== movieId
        )

        await updateDoc(userRef, {
            favorites: updatedFavorites
        })

        return true
    } catch (error) {
        console.error("Error removing from favorites", error)
        return false
    }
}

export const getFavoritesArray = async () => {
    const user = auth.currentUser
    if (!user) return []

    const snap = await getDoc(doc(db, "users", user.uid))
    if (!snap.exists()) return []

    return snap.data().favorites || []
}