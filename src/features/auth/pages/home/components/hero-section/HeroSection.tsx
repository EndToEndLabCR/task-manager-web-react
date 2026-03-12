import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./HeroSection.scss";

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__content">
        <Title className="hero__title">
          Master your workflow <br /> with TaskFlow
        </Title>
        <Paragraph className="hero__subtitle">
          Boost your team's productivity with the most intuitive task management
          platform. Streamline projects, collaborate in real-time, and hit your goals faster.
        </Paragraph>
        <div className="hero__actions">
          <Button type="primary" size="large" className="hero__btn-primary" onClick={() => navigate("/register")}>
            Get Started for Free
          </Button>
          <Button size="large" className="hero__btn-secondary">
            Book a Demo
          </Button>
        </div>

        <div className="hero__mockup">
          <div className="hero__mockup-window">
            <div className="hero__mockup-bar">
              <span className="hero__mockup-dot" />
              <span className="hero__mockup-dot" />
              <span className="hero__mockup-dot" />
            </div>
            <div className="hero__mockup-content">
              <div className="hero__mockup-sidebar">
                {["Dashboard", "My Tasks", "Projects", "Calendar", "Files", "Stats"].map((item) => (
                  <div key={item} className="hero__mockup-menu-item">
                    <span className="hero__mockup-menu-dot" />
                    <span className="hero__mockup-menu-label">{item}</span>
                  </div>
                ))}
              </div>
              <div className="hero__mockup-main">
                {["Database Setup & Sync", "Enabled", "Automation", "Event Integration Services",
                  "Feature Introduction", "Select Complementary Features", "Tasks", "Team Sync"].map((item, i) => (
                  <div key={i} className="hero__mockup-task-row">
                    <span className="hero__mockup-task-check" />
                    <span className="hero__mockup-task-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
