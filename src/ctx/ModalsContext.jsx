import { createContext, use, useState, useRef, useMemo } from 'react'

const initialState = {
    signIn: false,
    signUp: false
}

const ModalCTX = createContext(initialState)
let originalBodyPaddingRight = ''

export default function ModalsContext({ children }) {

    const [modals, setModals] = useState(initialState)
    const bodyScrollbarWidth = useRef(0)

    function applyBodyStyles() {
        const body = document.body
        if (!originalBodyPaddingRight) {
            originalBodyPaddingRight = body.style.paddingRight
        }
        body.style.overflow = 'hidden'
        if (bodyScrollbarWidth.current === 0) {
            bodyScrollbarWidth.current = window.innerWidth - document.documentElement.clientWidth
        }
        if (bodyScrollbarWidth.current > 0) {
            body.style.paddingRight = `${bodyScrollbarWidth.current}px`
            console.log('Applied padding-right:', body.style.paddingRight);
        }
    }

    function resetBodyStyles() {
        const body = document.body
        body.style.overflow = ''
        body.style.paddingRight = originalBodyPaddingRight
        originalBodyPaddingRight = ''
        bodyScrollbarWidth.current = 0
    }

    function handleOpenModal(modal) {
        setModals(prevModals => {
            const newModals = {}
            const wasAnyModalOpen = Object.values(prevModals).some(isOpen => isOpen)

            for (let key in prevModals) {
                newModals[key] = (key === modal)
            }
            if (!wasAnyModalOpen) {
                applyBodyStyles()
            }
            return newModals
        })
    }

    function handleCloseModal() {
        setModals(initialState)
        resetBodyStyles()
    }


    const contextValue = useMemo(() => {
        return [modals, handleOpenModal, handleCloseModal]
    }, [modals])

    return <ModalCTX value={contextValue}>{children}</ModalCTX>
}

export const useModals = () => use(ModalCTX)