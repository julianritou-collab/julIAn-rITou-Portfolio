import { useState, useRef, useLayoutEffect, useId } from 'react'

function Collapse({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [height, setHeight] = useState(0)
    const bodyRef = useRef(null)

    const collapseId = useId()
    const buttonId = `${collapseId}-button`
    const contentId = `${collapseId}-content`

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (isOpen && bodyRef.current) {
                setHeight(bodyRef.current.scrollHeight)
            } else {
                setHeight(0)
            }
        }
        updateHeight()

        window.addEventListener('resize', updateHeight)
        return () => window.removeEventListener('resize', updateHeight)
    }, [children, isOpen])
    return (
        <div className={`collapse${isOpen ? ' collapse--open' : ''}`}>
            <button
                className="collapse__header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                id={buttonId}
            >
                <span className="collapse__title">{title}</span>
                <span className="collapse__icon" aria-hidden="true" />
            </button>
            <div
                className="collapse__body"
                ref={bodyRef}
                style={{ maxHeight: `${height}px` }}
                aria-labelledby={buttonId}
                role="region"
            >
                <div className="collapse__content">{children}</div>
            </div>
        </div>
    )
}

export default Collapse
