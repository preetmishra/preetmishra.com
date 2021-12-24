import React, { useEffect, useState } from "react";

export default function useDarkMode(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    setTheme(localStorage?.theme || "light");
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    // Store the selected theme in the local storage.
    localStorage.setItem("theme", theme);

    if (
      theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, isMounted]);

  return [theme, setTheme];
}
