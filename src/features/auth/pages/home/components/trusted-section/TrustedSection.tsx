import React from "react";
import { Typography } from "antd";
import "./TrustedSection.scss";

const { Text } = Typography;
const LOGOS: string[] = ["Company A", "Company B", "Company C", "Company D", "Company E"];

const TrustedSection: React.FC = () => (
  <section className="trusted">
    <Text className="trusted__label">TRUSTED BY TEAMS AT</Text>
    <div className="trusted__logos">
      {LOGOS.map((name) => (
        <div key={name} className="trusted__logo-placeholder" />
      ))}
    </div>
  </section>
);

export default TrustedSection;
