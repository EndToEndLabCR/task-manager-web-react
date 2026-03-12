import React from "react";
import { Row, Col, Typography } from "antd";
import { GlobalOutlined, TwitterOutlined } from "@ant-design/icons";
import "./HomeFooter.scss";

const { Text, Paragraph } = Typography;

interface FooterColumn {
  heading: string;
  links: string[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  { heading: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
  { heading: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
  { heading: "Support", links: ["Help Center", "Privacy", "Terms", "Status"] },
];

const HomeFooter: React.FC = () => (
  <footer className="home-footer">
    <div className="home-footer__inner">
      <Row gutter={[48, 32]}>
        <Col xs={24} md={6}>
          <div className="home-footer__brand">
            <div className="home-footer__logo">
              <span className="home-footer__logo-icon">✔</span>
              <span className="home-footer__logo-text">TaskFlow</span>
            </div>
            <Paragraph className="home-footer__tagline">
              The modern standard for team task management. Simpler, powerful, and built for scale.
            </Paragraph>
            <div className="home-footer__socials">
              <GlobalOutlined className="home-footer__social-icon" />
              <TwitterOutlined className="home-footer__social-icon" />
            </div>
          </div>
        </Col>

        {FOOTER_COLUMNS.map((col) => (
          <Col key={col.heading} xs={12} md={6}>
            <Text className="home-footer__heading">{col.heading}</Text>
            <ul className="home-footer__links">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="home-footer__link">{link}</a>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>

      <div className="home-footer__bottom">
        <Text className="home-footer__copy">
          © {new Date().getFullYear()} EndToEndLab. All rights reserved.
        </Text>
        <div className="home-footer__legal">
          {["Cookies", "Privacy Policy", "Terms of Service"].map((item) => (
            <a key={item} href="#" className="home-footer__legal-link">{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default HomeFooter;
