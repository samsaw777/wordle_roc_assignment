import React, { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const [theme, setTheme] = useState<string>("light-theme");

  const changeTheme = () => {
    setTheme((theme) =>
      theme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
