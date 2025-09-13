import React from "react";
import styles from "../styles/components/Contact.module.scss";

export default function ContactPage() {
  return (
    <section className={styles.contactSection}>
      <form className={styles.contactForm}>
        <h2 className={styles.contactTitle}>Contact Me</h2>
        <p className={styles.contactSubtitle}>
          Please fill out the form below and I will get back to you as soon as possible!
        </p>
        <label className={styles.contactLabel} htmlFor="name">
          Name
        </label>
        <input
          className={styles.contactInput}
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
        />

        <label className={styles.contactLabel} htmlFor="email">
          Email
        </label>
        <input
          className={styles.contactInput}
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />

        <label className={styles.contactLabel} htmlFor="message">
          Message
        </label>
        <textarea
          className={styles.contactTextarea}
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Type your message here..."
        />

        <button type="submit" className={styles.contactSubmit}>
          Send
        </button>
      </form>
    </section>
  );
}
