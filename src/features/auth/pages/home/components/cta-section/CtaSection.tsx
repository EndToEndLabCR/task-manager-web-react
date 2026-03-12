import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./CtaSection.scss";

const { Title, Paragraph } = Typography;

const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <div className="cta__content">
        <Title className="cta__title">Ready to transform your productivity?</Title>
        <Paragraph className="cta__subtitle">
          Join over 10,000 teams who use TaskFlow to get more done every day.
          Start your 14-day free trial now. No credit card required.
        </Paragraph>
        <div className="cta__actions">
          <Button size="large" className="cta__btn-primary" onClick={() => navigate("/register")}>
            Start your free trial
          </Button>
          <Button size="large" className="cta__btn-secondary">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
