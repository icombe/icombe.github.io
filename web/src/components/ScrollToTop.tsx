import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  // Ensure SPA controls scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      try { window.history.scrollRestoration = "manual"; } catch {}
    }
  }, []);

  const scrollNow = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also try common app containers if they scroll
    const root = document.getElementById("root");
    if (root && root.scrollTop) root.scrollTop = 0;
    const app = document.getElementById("app");
    if (app && app.scrollTop) app.scrollTop = 0;
  };

  useLayoutEffect(() => {
    // Before paint
    scrollNow();
    // After paint (handles late restorations)
    requestAnimationFrame(() => {
      scrollNow();
      requestAnimationFrame(scrollNow);
    });
  }, [pathname, search, hash]);

  return null;
}