import React from "react";
import HomeNavbar from "../../../../shared/components/nav-bar/HomeNavbar";
import HeroSection from "./components/hero-section/HeroSection";
import TrustedSection from "./components/trusted-section/TrustedSection";
import FeaturesSection from "./components/features-section/FeaturesSection";
import CtaSection from "./components/cta-section/CtaSection";
import HomeFooter from "./components/home-footer/HomeFooter";
import "./Home.scss";

const Home: React.FC = () => (
  <div className="home">
    <HomeNavbar />
    <main className="home__main">
      <HeroSection />
      <TrustedSection />
      <FeaturesSection />
      <CtaSection />
    </main>
    <HomeFooter />
  </div>
);

export default Home;
