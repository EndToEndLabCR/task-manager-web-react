import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ProjectsEmpty.scss";

interface ProjectsEmptyProps {
  onNewProject: () => void;
}

const ProjectsEmpty: React.FC<ProjectsEmptyProps> = ({ onNewProject }) => (
  <div className="projects-empty">
    <div className="projects-empty__illustration">
      <div className="projects-empty__folder">
        <span className="projects-empty__star">★</span>
        <div className="projects-empty__folder-icon">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="24" width="64" height="44" rx="6" fill="#e8edf2" />
            <path d="M8 30C8 26.7 10.7 24 14 24H32L38 32H66C69.3 32 72 34.7 72 38V62C72 65.3 69.3 68 66 68H14C10.7 68 8 65.3 8 62V30Z" fill="#d0d8e4" />
            <rect x="52" y="52" width="24" height="24" rx="6" fill="#1677ff" />
            <path d="M64 58v12M58 64h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>

    <h2 className="projects-empty__title">No projects yet</h2>
    <p className="projects-empty__description">
      Create your first project to start organizing tasks and collaborating with your team.
    </p>

    <Button
      type="primary"
      size="large"
      icon={<PlusOutlined />}
      onClick={onNewProject}
      className="projects-empty__btn"
    >
      Create project
    </Button>
  </div>
);

export default ProjectsEmpty;