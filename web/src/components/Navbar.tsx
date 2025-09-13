import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/Navbar.module.scss";
import { useTheme } from "../context/ThemeContext";
import DarkIcon from "../assets/dark.svg";
import LightIcon from "../assets/light.svg";

const SHOW_TESTIMONIALS = false; // keep hidden

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className={styles.navbar}>
      {/* Brand (left) with animated gradient wave */}
      <Link
        to="/"
        className={`${styles.brand} ${styles.waveText}`}
        aria-label="Go to home"
      >
        Ian Combe
      </Link>

      {/* Center links */}
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
            location.pathname.startsWith("/about") ? styles.activeNav : ""
          }`}
        >
          About
        </Link>
        {SHOW_TESTIMONIALS && (
          <Link
            to="/testimonials"
            className={`${styles.centerNavLink} ${
              location.pathname.startsWith("/testimonials") ? styles.activeNav : ""
            }`}
          >
            Testimonials
          </Link>
        )}
      </div>

      {/* Right side: theme toggle + contact */}
      <div className={styles.rightNav}>
        <button
          type="button"
          className={styles.themeToggle}
          aria-pressed={isDark}
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className={styles.toggleThumb} aria-hidden="true" />
          {/* Only render the current icon */}
          <img
            src={isDark ? DarkIcon : LightIcon}
            className={styles.toggleIcon}
            alt=""
            aria-hidden="true"
            draggable={false}
          />
        </button>

        <Link to="/contact" className={styles.contactBtn}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
