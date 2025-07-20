import { createContext, use, useState, useRef, useMemo } from 'react'

const initialState = {
    signIn: false,
    signUp: false
}

const ModalCTX = createContext(initialState)

export default function ModalsContext({ children }) {

    const [activeModal, setActiveModal] = useState(initialState)
    const dialogRef = useRef(null)
    const originalPaddingRef = useRef('')

    const openModal = (key) => {
        setActiveModal((prev) => ({
            ...Object.fromEntries(Object.keys(prev).map((k) => [k, false])),
            [key]: true,
        }))
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        originalPaddingRef.current = getComputedStyle(document.body).paddingRight
        document.body.classList.add('no-scroll')
        document.body.style.paddingRight = `${scrollbarWidth}px`
        dialogRef.current?.showModal()
    }

    const closeModal = () => {
        setActiveModal(initialState)
        document.body.classList.remove('no-scroll')
        document.body.style.paddingRight = originalPaddingRef.current || ''
        dialogRef.current?.close()
    }

    const contextValue = useMemo(() => {
        return {dialogRef, activeModal, openModal, closeModal}
    }, [activeModal])

    return <ModalCTX value={contextValue}>{children}</ModalCTX>
}

export const useModals = () => use(ModalCTX)