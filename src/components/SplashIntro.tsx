"use client";

import { useEffect, useState } from "react";

const TEXT = "Fikret Tekstil";
const STORAGE_KEY = "fikret-splash-shown";

// Orange-dominant bubble letters with one cream accent letter per word
// (mirrors the "PijamaPark" reference: most letters in brand color,
// one or two in a soft contrast tone).
const ACCENT_INDEXES = new Set<number>([3, 11]); // "r" in Fikret, "t" in Tekstil

export function SplashIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-stage">
        <div className="splash-logo">
          {TEXT.split("").map((ch, i) => {
            if (ch === " ") return <span key={i} className="splash-space" />;
            const isAccent = ACCENT_INDEXES.has(i);
            return (
              <span
                key={i}
                className={`bubble-letter${isAccent ? " accent" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="bubble-text">{ch}</span>
                <span className="bubble-shine" />
                <span className="bubble-spark s1" />
                <span className="bubble-spark s2" />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
