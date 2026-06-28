import * as Dialog from '@radix-ui/react-dialog'
import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import Button from './Button'

const SUBJECTS = ['Demande de devis', 'Proposition de mission', 'Question technique', 'Autre']

const FIELD_ORDER = ['email', 'subject', 'message']

function ContactModal({ open, onOpenChange, onCloseAutoFocus }) {
    const [form, setForm] = useState({ email: '', subject: '', message: '' })
    const [fieldErrors, setFieldErrors] = useState({})
    const [error, setError] = useState('')
    const [sending, setSending] = useState(false)

    const emailRef = useRef(null)
    const subjectRef = useRef(null)
    const messageRef = useRef(null)

    const refs = {
        email: emailRef,
        subject: subjectRef,
        message: messageRef,
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))

        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const next = { ...prev }
                delete next[name]
                return next
            })
        }
    }

    const validateForm = () => {
        const errors = {}
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errors.email = 'Le champ Email est invalide.'
        }
        if (!form.subject) {
            errors.subject = 'Le champ Sujet est obligatoire.'
        }
        if (!form.message || form.message.trim().length < 10) {
            errors.message = 'Le champ Message doit contenir au moins 10 caractères.'
        }
        return errors
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const errors = validateForm()

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)

            const firstInvalidField = FIELD_ORDER.find((field) => errors[field])
            if (firstInvalidField) {
                setError(errors[firstInvalidField]) // un seul message visible
                refs[firstInvalidField].current?.focus()
            }
            return
        }

        setFieldErrors({})

        try {
            setSending(true)
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_email: form.email,
                    subject: form.subject,
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            setForm({ email: '', subject: '', message: '' })
            setError('')
            onOpenChange(false)
        } catch {
            setError('Envoi impossible pour le moment.')
        } finally {
            setSending(false)
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <div className="contact-modal">
                    <Dialog.Overlay className="contact-modal__overlay" />
                    <Dialog.Content
                        className="contact-modal__content"
                        aria-describedby="contact-desc"
                        onCloseAutoFocus={onCloseAutoFocus}
                    >
                        <Dialog.Title className="contact-modal__title">Me contacter</Dialog.Title>
                        <p id="contact-desc" className="contact-modal__description">
                            Contactez-moi directement par un message, je vous réponds rapidement!
                        </p>
                        <form onSubmit={onSubmit} className="contact-modal__form" noValidate>
                            <div className="contact-modal__field-group">
                                <label className="contact-modal__label" htmlFor="contact-email">
                                    Email
                                </label>
                                <input
                                    ref={emailRef}
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={onChange}
                                    required
                                    aria-invalid={Boolean(fieldErrors.email)}
                                    aria-describedby={
                                        fieldErrors.email ? 'contact-email-error' : undefined
                                    }
                                    className={`contact-modal__control ${fieldErrors.email ? 'contact-modal__control--invalid' : ''}`.trim()}
                                />
                                <span id="contact-email-error" className="contact-modal__sr-only">
                                    {fieldErrors.email || ''}
                                </span>
                            </div>

                            <div className="contact-modal__field-group">
                                <label className="contact-modal__label" htmlFor="contact-subject">
                                    Sujet
                                </label>
                                <select
                                    ref={subjectRef}
                                    id="contact-subject"
                                    name="subject"
                                    value={form.subject}
                                    onChange={onChange}
                                    required
                                    aria-invalid={Boolean(fieldErrors.subject)}
                                    aria-describedby={
                                        fieldErrors.subject ? 'contact-subject-error' : undefined
                                    }
                                    className={`contact-modal__control ${fieldErrors.subject ? 'contact-modal__control--invalid' : ''}`.trim()}
                                >
                                    <option value="">Choisir un sujet</option>
                                    {SUBJECTS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                                <span id="contact-subject-error" className="contact-modal__sr-only">
                                    {fieldErrors.subject || ''}
                                </span>
                            </div>

                            <div className="contact-modal__field-group">
                                <label className="contact-modal__label" htmlFor="contact-message">
                                    Message
                                </label>
                                <textarea
                                    ref={messageRef}
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={onChange}
                                    minLength={10}
                                    required
                                    aria-invalid={Boolean(fieldErrors.message)}
                                    aria-describedby={
                                        fieldErrors.message ? 'contact-message-error' : undefined
                                    }
                                    className={`contact-modal__control ${fieldErrors.message ? 'contact-modal__control--invalid' : ''}`.trim()}
                                />
                                <span id="contact-message-error" className="contact-modal__sr-only">
                                    {fieldErrors.message || ''}
                                </span>
                            </div>

                            {error ? (
                                <p className="contact-modal__error" role="alert">
                                    {error}
                                </p>
                            ) : null}

                            <div className="contact-modal__actions">
                                <Button
                                    className="contact-modal__submit"
                                    type="submit"
                                    variant="primary"
                                    size="medium"
                                    disabled={sending}
                                >
                                    {sending ? 'Envoi...' : 'Envoyer'}
                                </Button>

                                <Dialog.Close asChild>
                                    <Button
                                        className="contact-modal__cancel"
                                        type="button"
                                        variant="secondary"
                                        size="medium"
                                    >
                                        Annuler
                                    </Button>
                                </Dialog.Close>
                            </div>
                        </form>
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default ContactModal
