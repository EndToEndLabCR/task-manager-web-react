import React from "react";
import { Typography } from "antd";
import "./AppFooter.scss";

const { Text } = Typography;

const FOOTER_LINKS: string[] = ["Privacy Policy", "Terms of Service", "Security"];

const AppFooter: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__links">
        {FOOTER_LINKS.map((item) => (
          <a key={item} href="#" className="app-footer__link">
            {item}
          </a>
        ))}
      </div>
      <Text className="app-footer__copy">
        © {new Date().getFullYear()} EndToEndLab. Built for productivity.
      </Text>
    </footer>
  );
};

export default AppFooter;