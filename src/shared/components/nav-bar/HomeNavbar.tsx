import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./HomeNavbar.scss";

const NAV_LINKS: string[] = ["Features", "Solutions", "Pricing", "Resources"];

const HomeNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="home-navbar">
      <div className="home-navbar__inner">
        <div
          className="home-navbar__logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <span className="home-navbar__logo-icon">✔</span>
          <span className="home-navbar__logo-text">TaskFlow</span>
        </div>

        <nav className="home-navbar__links">
          {NAV_LINKS.map((item) => (
            <a key={item} href="#" className="home-navbar__link">{item}</a>
          ))}
        </nav>

        <div className="home-navbar__actions">
          <Button type="text" onClick={() => navigate("/login")}>Log in</Button>
          <Button type="primary" onClick={() => navigate("/register")}>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
