import React from "react";
import { Row, Col } from "antd";
import ProjectCard from "../project-card/ProjectCard";
import type { Project } from "../../types/project.types";
import "./ProjectGrid.scss";

interface ProjectGridProps {
  projects: Project[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onView,
  onEdit,
  onDelete,
}) => (
  <Row gutter={[24, 24]} className="project-grid">
    {projects.map((project) => (
      <Col key={project.id} xs={24} sm={12} lg={8}>
        <ProjectCard
          project={project}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Col>
    ))}
  </Row>
);

export default ProjectGrid;
