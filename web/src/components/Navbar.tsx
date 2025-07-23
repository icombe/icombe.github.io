import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/index.module.scss";
import { useTheme } from "../context/ThemeContext";
import darkIcon from "../../public/assets/dark.svg"; 
import lightIcon from "../../public/assets/light.svg";

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      {/* Brand (left), larger, waveText, links to home */}
      <Link
        to="/"
        className={styles.brand + " " + styles.waveText}
        style={{ fontSize: "2.5rem", textDecoration: "none" }}
      >
        Ian Combe
      </Link>

      {/* Centered nav links */}
      <div className={styles.centerNav}>
        <Link
          to="/"
          className={`${styles.centerNavLink} ${
            location.pathname === "/" ? styles.activeNav : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${styles.centerNavLink} ${
            location.pathname === "/about" ? styles.activeNav : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/testimonials"
          className={`${styles.centerNavLink} ${
            location.pathname === "/testimonials" ? styles.activeNav : ""
          }`}
        >
          Testimonials
        </Link>
      </div>

      {/* Right side: dark mode toggle + contact */}
      <div className={styles.rightNav}>
        <button
          className={styles.circleBtn}
          aria-label="Toggle dark mode"
          onClick={(e) => {
            e.currentTarget.blur(); // Remove highlight after click
            toggleTheme();
          }}
          tabIndex={0}
          style={{ outline: "none", boxShadow: "none" }}
        >
          <img
            src={theme === "dark" ? lightIcon : darkIcon}
            alt={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            style={{
              width: 24,
              height: 24,
              filter: theme === "dark" ? "invert(1)" : "invert(0)",
              transition: "filter 0.4s",
            }}
            draggable={false}
          />
        </button>
        <Link to="/contact" className={styles.contactNavBtn}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
