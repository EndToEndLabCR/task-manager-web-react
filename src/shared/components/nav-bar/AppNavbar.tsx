import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppNavbar.scss";

interface AppNavbarProps {
  showHelpCenter?: boolean;
}

const AppNavbar: React.FC<AppNavbarProps> = ({ showHelpCenter = true }) => {
  const navigate = useNavigate();

  return (
    <header className="app-navbar">
      <div className="app-navbar__inner">
        <div
          className="app-navbar__logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <span className="app-navbar__logo-icon">✔</span>
          <span className="app-navbar__logo-text">TaskFlow</span>
        </div>
        {showHelpCenter && (
          <a href="#" className="app-navbar__help-link">
            Help Center
          </a>
        )}
      </div>
    </header>
  );
};

export default AppNavbar;