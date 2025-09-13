import React from "react";
import styles from "../styles/components/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Ian Combe. All rights reserved.
    </footer>
  );
}
