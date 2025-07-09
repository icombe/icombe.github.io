// src/components/Navbar.tsx
import React from "react";
import styles from "../styles/index.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.waveText}>IanCombe.dev</h1>
      <div className={styles.navbarButtons}>
        <a href="/" className={styles.btn}>
          Home
        </a>
        <a href="/about" className={styles.btn}>
          About
        </a>
        <a href="/contact" className={styles.btn}>
          Contact
        </a>
      </div>
    </nav>
  );
}
