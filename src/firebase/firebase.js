import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(config)
const auth = getAuth(app)
const db = getFirestore(app)

const googleAuth = new GoogleAuthProvider(auth)
googleAuth.setCustomParameters({
    prompt: 'select_account'
})

export const popUp = async () => {
    return signInWithPopup(auth, googleAuth)
}

export const emailLogin = async (email, password) => {
    return  signInWithEmailAndPassword(auth, email, password)
}

export const emailCreate = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
    return signOut(auth)
}