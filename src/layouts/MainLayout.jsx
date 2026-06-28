import { Outlet } from 'react-router-dom'
import { useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'

function MainLayout() {
    const [isContactOpen, setIsContactOpen] = useState(false)
    const focusRestoreRef = useRef(null)

    const openContactModal = (triggerElement = null, shouldRestoreFocus = false) => {
        focusRestoreRef.current =
            shouldRestoreFocus && triggerElement instanceof HTMLElement ? triggerElement : null

        setIsContactOpen(true)
    }

    const handleContactModalOpenChange = (nextOpen) => {
        setIsContactOpen(nextOpen)

        if (!nextOpen) {
            const restoreTarget = focusRestoreRef.current
            requestAnimationFrame(() => {
                if (
                    restoreTarget &&
                    restoreTarget.isConnected &&
                    typeof restoreTarget.focus === 'function'
                ) {
                    restoreTarget.focus()
                }
                focusRestoreRef.current = null
            })
        }
    }

    return (
        <>
            <Header />
            <main className="container main__inner" id="main-content">
                <Outlet context={{ openContactModal }} />
            </main>
            <Footer onOpenContact={openContactModal} />
            <ContactModal
                open={isContactOpen}
                onOpenChange={handleContactModalOpenChange}
                onCloseAutoFocus={(event) => event.preventDefault()}
            />
        </>
    )
}

export default MainLayout
