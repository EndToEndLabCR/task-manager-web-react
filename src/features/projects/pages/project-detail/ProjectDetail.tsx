import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { MOCK_PROJECTS } from "../../mocks/projects.mock";
import { formatRelativeDate } from "../../../../shared/utils/date.utils";
import "./ProjectDetail.scss";

const { Title, Text } = Typography;

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = MOCK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-detail project-detail--not-found">
        <Text>Project not found.</Text>
        <Button onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Breadcrumb
        className="project-detail__breadcrumb"
        items={[
          {
            title: (
              <a onClick={() => navigate("/projects")}>Projects</a>
            ),
          },
          { title: project.name },
        ]}
      />

      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="project-detail__back"
      >
        Back
      </Button>

      <Title level={2} className="project-detail__title">
        {project.name}
      </Title>

      <Text className="project-detail__description">
        {project.description}
      </Text>

      <Text className="project-detail__updated">
        Last updated {formatRelativeDate(project.lastUpdated)}
      </Text>
    </div>
  );
};

export default ProjectDetail;