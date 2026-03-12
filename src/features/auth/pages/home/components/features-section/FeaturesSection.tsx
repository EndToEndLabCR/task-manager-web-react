import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { AppstoreOutlined, TeamOutlined, BarChartOutlined } from "@ant-design/icons";
import "./FeaturesSection.scss";

const { Title, Paragraph } = Typography;

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <AppstoreOutlined />,
    title: "Kanban Boards",
    description: "Visualize your work and move tasks through stages with our intuitive drag-and-drop interface. Customize columns to match your team's workflow.",
  },
  {
    icon: <TeamOutlined />,
    title: "Real-time Collaboration",
    description: "Work together seamlessly with instant updates, @mentions, and shared project spaces. Communication happens right where the work is.",
  },
  {
    icon: <BarChartOutlined />,
    title: "Advanced Analytics",
    description: "Gain deep insights into team performance and project timelines with automated reports and visual progress tracking tools.",
  },
];

const FeaturesSection: React.FC = () => (
  <section className="features">
    <div className="features__header">
      <Title level={2} className="features__title">
        Everything you need to ship faster
      </Title>
      <Paragraph className="features__subtitle">
        Powerful features designed to help modern teams stay organized and focused without the bloat.
      </Paragraph>
    </div>
    <Row gutter={[24, 24]}>
      {FEATURES.map((feature) => (
        <Col key={feature.title} xs={24} md={8}>
          <Card className="features__card" bordered={false}>
            <div className="features__icon">{feature.icon}</div>
            <Title level={4} className="features__card-title">{feature.title}</Title>
            <Paragraph className="features__card-description">{feature.description}</Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  </section>
);

export default FeaturesSection;
