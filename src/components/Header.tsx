import React, { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const [theme, setTheme] = useState<string>("");

  const changeTheme = () => {
    setTheme((theme) =>
      theme === "light-theme" ? "dark-theme" : "light-theme"
    );
    setLocalStorage(theme === "light-theme" ? "dark-theme" : "light-theme");
  };

  const setLocalStorage = (theme: string) => {
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const ltheme = localStorage.getItem("theme");
    if (!ltheme) {
      setTheme("light-theme");
      document.body.className = "light-theme";
    } else {
      setTheme(ltheme);
      document.body.className = ltheme;
    }
  }, []);

  return (
    <nav className="header">
      <span className="heading">Wordle Assignment</span>
      <span className="logo" onClick={() => changeTheme()}>
        {theme === "dark-theme" ? <MdOutlineLightMode /> : <MdDarkMode />}
      </span>
    </nav>
  );
};

export default Header;
