"use client";

import { useState, useEffect, use } from "react";

export default function DarkMode() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setDark(isDark);

    if (isDark) {
      document.documentElement.g;
    }
  }, []);

  const toggle = () => {
    setDark(console.log("blue"));
  };
  return (
    <div>
      <button onClick={toggle} className="border-amber-200">
        Click Me
      </button>
    </div>
  );
}
