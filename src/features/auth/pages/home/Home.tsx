import {
  AppstoreOutlined,
  BarChartOutlined,
  GlobalOutlined,
  TeamOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const { Title, Paragraph, Text } = Typography;

// ─── Types ───────────────────────────────────────────────────────────────────

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FooterColumn {
  heading: string;
  links: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES: FeatureCard[] = [
  {
    icon: <AppstoreOutlined />,
    title: "Kanban Boards",
    description:
      "Visualize your work and move tasks through stages with our intuitive drag-and-drop interface. Customize columns to match your team's workflow.",
  },
  {
    icon: <TeamOutlined />,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with instant updates, @mentions, and shared project spaces. Communication happens right where the work is.",
  },
  {
    icon: <BarChartOutlined />,
    title: "Advanced Analytics",
    description:
      "Gain deep insights into team performance and project timelines with automated reports and visual progress tracking tools.",
  },
];

const TRUSTED_LOGOS: string[] = [
  "Company A",
  "Company B",
  "Company C",
  "Company D",
  "Company E",
];

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Blog", "Contact"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Privacy", "Terms", "Status"],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* ── Navbar ── */}
      <header className="home__navbar">
        <div className="home__navbar-inner">
          <div className="home__logo">
            <span className="home__logo-icon">✔</span>
            <span className="home__logo-text">TaskFlow</span>
          </div>

          <nav className="home__nav-links">
            {["Features", "Solutions", "Pricing", "Resources"].map((item) => (
              <a key={item} className="home__nav-link" href="#">
                {item}
              </a>
            ))}
          </nav>

          <div className="home__nav-actions">
            <Button
              type="text"
              className="home__nav-login"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button
              type="primary"
              className="home__nav-cta"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="home__hero">
        <div className="home__hero-content">
          <Title className="home__hero-title">
            Master your workflow <br /> with TaskFlow
          </Title>
          <Paragraph className="home__hero-subtitle">
            Boost your team's productivity with the most intuitive task management
            platform. Streamline projects, collaborate in real-time, and hit your
            goals faster.
          </Paragraph>
          <div className="home__hero-actions">
            <Button
              type="primary"
              size="large"
              className="home__btn-primary"
              onClick={() => navigate("/register")}
            >
              Get Started for Free
            </Button>
            <Button
              size="large"
              className="home__btn-secondary"
            >
              Book a Demo
            </Button>
          </div>

          {/* Dashboard */}
          <div className="home__hero-mockup">
            <div className="home__mockup-window">
              <div className="home__mockup-bar">
                <span className="home__mockup-dot" />
                <span className="home__mockup-dot" />
                <span className="home__mockup-dot" />
              </div>
              <div className="home__mockup-content">
                <div className="home__mockup-sidebar">
                  {["Dashboard", "My Tasks", "Projects", "Calendar", "Files", "Stats"].map(
                    (item) => (
                      <div key={item} className="home__mockup-menu-item">
                        <span className="home__mockup-menu-dot" />
                        <span className="home__mockup-menu-label">{item}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="home__mockup-main">
                  {[
                    "Database Setup & Sync",
                    "Enabled",
                    "Automation",
                    "Event Integration Services",
                    "Feature Introduction",
                    "Select Complementary Features",
                    "Tasks",
                    "Team Sync",
                  ].map((item, i) => (
                    <div key={i} className="home__mockup-task-row">
                      <span className="home__mockup-task-check" />
                      <span className="home__mockup-task-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted logos ── */}
      <section className="home__trusted">
        <Text className="home__trusted-label">TRUSTED BY TEAMS AT</Text>
        <div className="home__trusted-logos">
          {TRUSTED_LOGOS.map((name) => (
            <div key={name} className="home__trusted-logo-placeholder" />
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="home__features">
        <div className="home__features-header">
          <Title level={2} className="home__features-title">
            Everything you need to ship faster
          </Title>
          <Paragraph className="home__features-subtitle">
            Powerful features designed to help modern teams stay organized and
            focused without the bloat.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="home__features-grid">
          {FEATURES.map((feature) => (
            <Col key={feature.title} xs={24} sm={24} md={8}>
              <Card className="home__feature-card" bordered={false}>
                <div className="home__feature-icon">{feature.icon}</div>
                <Title level={4} className="home__feature-title">
                  {feature.title}
                </Title>
                <Paragraph className="home__feature-description">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* ── CTA Banner ── */}
      <section className="home__cta">
        <div className="home__cta-content">
          <Title className="home__cta-title">
            Ready to transform your productivity?
          </Title>
          <Paragraph className="home__cta-subtitle">
            Join over 10,000 teams who use TaskFlow to get more done every day.
            Start your 14-day free trial now. No credit card required.
          </Paragraph>
          <div className="home__cta-actions">
            <Button
              size="large"
              className="home__cta-btn-primary"
              onClick={() => navigate("/register")}
            >
              Start your free trial
            </Button>
            <Button size="large" className="home__cta-btn-secondary">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home__footer">
        <div className="home__footer-inner">
          <Row gutter={[48, 32]}>
            {/* Brand column */}
            <Col xs={24} sm={24} md={6}>
              <div className="home__footer-brand">
                <div className="home__logo">
                  <span className="home__logo-icon">✔</span>
                  <span className="home__logo-text">TaskFlow</span>
                </div>
                <Paragraph className="home__footer-tagline">
                  The modern standard for team task management. Simpler, powerful,
                  and built for scale.
                </Paragraph>
                <div className="home__footer-socials">
                  <GlobalOutlined className="home__footer-social-icon" />
                  <TwitterOutlined className="home__footer-social-icon" />
                </div>
              </div>
            </Col>

            {/* Link columns */}
            {FOOTER_COLUMNS.map((col) => (
              <Col key={col.heading} xs={12} sm={8} md={6}>
                <div className="home__footer-column">
                  <Text className="home__footer-heading">{col.heading}</Text>
                  <ul className="home__footer-links">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="home__footer-link">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>

          <div className="home__footer-bottom">
            <Text className="home__footer-copy">
              © {new Date().getFullYear()} EndToEndLab. All rights reserved.
            </Text>
            <div className="home__footer-legal">
              {["Cookies", "Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#" className="home__footer-legal-link">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;