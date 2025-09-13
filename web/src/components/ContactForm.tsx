import React, { useMemo, useState } from "react";
import styles from "../styles/components/Contact.module.scss";

// Builds "icombe77+portfolio@gmail.com" at click-time without putting it in the HTML
function decodeEmail(): string {
  const localRev = "oiloftrop+77ebmoci"; // "icombe77+portfolio" reversed
  const domainRev = "moc.liamg";         // "gmail.com" reversed
  const local = localRev.split("").reverse().join("");
  const domain = domainRev.split("").reverse().join("");
  return `${local}@${domain}`;
}

function Placeholder() {
  return (
    <section className={styles.contactSection} id="contact">
      <div
        className={styles.contactForm}
        role="status"
        aria-live="polite"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h2 className={styles.contactTitle}>Contact</h2>
        <p className={styles.contactSubtitle}>
          Coming soon — a simple contact form will be available here.
        </p>
      </div>
    </section>
  );
}

// Default export: always show placeholder
export default function ContactForm() {
  return <Placeholder />;
}

// Original implementation preserved (not used). Re-enable later by exporting this as default.
export function OriginalContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  const fallbackEmail = useMemo(decodeEmail, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSent(false);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const message = String(fd.get("message") || "");
    const website = ""; // honeypot stays empty

    console.log("CONTACT submit -> endpoint:", endpoint); // TEMP

    if (!endpoint) {
      const subject = `Portfolio contact from ${name || "Visitor"}`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— Sent from portfolio`;
      window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      (e.currentTarget as HTMLFormElement).reset();
      setSent(true);
      return;
    }

    try {
      setSending(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      (e.currentTarget as HTMLFormElement).reset();
      setSent(true);
    } catch (err: any) {
      const subject = `Portfolio contact from ${name || "Visitor"}`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— Sent from portfolio (fallback)`;
      try {
        window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      } catch {
        setError(err?.message || "Failed to send");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.contactSection} id="contact">
      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.contactTitle}>Contact</h2>
        <p className={styles.contactSubtitle}>
          Send a message directly from this site. No external services required.
        </p>

        {/* Honeypot (hidden field) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
          aria-hidden="true"
        />

        <label className={styles.contactLabel} htmlFor="name">Name</label>
        <input className={styles.contactInput} id="name" name="name" type="text" required placeholder="Your name" />

        <label className={styles.contactLabel} htmlFor="email">Email</label>
        <input className={styles.contactInput} id="email" name="email" type="email" required placeholder="you@example.com" />

        <label className={styles.contactLabel} htmlFor="message">Message</label>
        <textarea className={styles.contactTextarea} id="message" name="message" rows={6} required placeholder="Type your message…" />

        <button className={styles.contactSubmit} type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send"}
        </button>

        {sent && <p style={{ textAlign: "center", color: "#22c55e", marginTop: ".5rem" }}>Message sent. Thank you!</p>}
        {error && <p style={{ textAlign: "center", color: "#ef4444", marginTop: ".5rem" }}>{error}</p>}
      </form>
    </section>
  );
}
