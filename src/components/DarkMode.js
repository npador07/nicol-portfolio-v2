import { useEffect, useState } from "react";
import "../styles/DarkMode.css";

function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Handle button click
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      id="theme-toggle"
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkMode;
