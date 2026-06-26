import * as Dialog from "@radix-ui/react-dialog";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const SUBJECTS = [
  "Demande de devis",
  "Proposition de mission",
  "Question technique",
  "Autre",
];

function ContactModal({ open, onOpenChange }) {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Email invalide.");
      return;
    }
    if (!form.subject) {
      setError("Choisis un sujet.");
      return;
    }
    if (!form.message || form.message.trim().length < 10) {
      setError("Le message doit contenir au moins 10 caractères.");
      return;
    }

    try {
      setSending(true);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setForm({ email: "", subject: "", message: "" });
      onOpenChange(false);
    } catch {
      setError("Envoi impossible pour le moment.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="contact-modal__overlay" />
        <Dialog.Content className="contact-modal__content" aria-describedby="contact-desc">
          <Dialog.Title>Me contacter</Dialog.Title>
          <p id="contact-desc">Envoie un message direct.</p>

          <form onSubmit={onSubmit} className="contact-modal__form" noValidate>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />

            <label htmlFor="contact-subject">Sujet</label>
            <select
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={onChange}
              required
            >
              <option value="">Choisir un sujet</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={onChange}
              minLength={10}
              required
            />

            {error ? <p role="alert">{error}</p> : null}

            <button type="submit" disabled={sending}>
              {sending ? "Envoi..." : "Envoyer"}
            </button>

            <Dialog.Close asChild>
              <button type="button">Annuler</button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ContactModal;