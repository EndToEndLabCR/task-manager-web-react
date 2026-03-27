import React from "react";
import { Card, Typography, Dropdown, Popconfirm } from "antd";
import type { MenuProps } from "antd";
import { SwapOutlined, MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined,} from "@ant-design/icons";
import type { Project } from "../../types/project.types";
import { PROJECT_COLORS } from "../../mocks/projects.mock";
import { formatRelativeDate } from "../../../../shared/utils/date.utils";
import "./ProjectCard.scss";

const { Text, Paragraph } = Typography;

interface ProjectCardProps {
  project: Project;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onView,
  onEdit,
  onDelete,
}) => {
  const color = PROJECT_COLORS[project.color];

const menuItems: MenuProps["items"] = [
  {
    key: "view",
    icon: <EyeOutlined />,
    label: "View",
    onClick: ({ domEvent }) => {
      domEvent.stopPropagation(); 
      onView(project.id);
    },
  },
  {
    key: "edit",
    icon: <EditOutlined />,
    label: "Edit",
    onClick: ({ domEvent }) => {
      domEvent.stopPropagation(); 
      onEdit(project.id);
    },
  },
  { type: "divider" },
  {
    key: "delete",
    icon: <DeleteOutlined />,
    danger: true,
    label: (
      <Popconfirm
        title="Delete project"
        description={
          <>
            This will permanently delete <strong>{project.name}</strong>.
            {project.taskCount > 0 && (
              <>
                {" "}This project has{" "}
                <strong>
                  {project.taskCount} task{project.taskCount !== 1 ? "s" : ""}
                </strong>{" "}
                that will also be deleted.
              </>
            )}
          </>
        }
        onConfirm={(e) => {
          e?.stopPropagation();
          onDelete(project.id);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        placement="left"
      >
        <span onClick={(e) => e.stopPropagation()}>Delete</span>
      </Popconfirm>
    ),
  },
]

  return (
    <Card
      className="project-card"
      bordered={false}
      onClick={() => onView(project.id)}
    >
      <div className="project-card__color-bar" style={{ backgroundColor: color }} />

      <div className="project-card__body">
        <div className="project-card__header">
          <Text className="project-card__name">{project.name}</Text>
          <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
            <button
              className="project-card__menu-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreOutlined />
            </button>
          </Dropdown>
        </div>

        <Paragraph className="project-card__description" ellipsis={{ rows: 2 }}>
          {project.description}
        </Paragraph>

        <div className="project-card__footer">
          <div className="project-card__tasks">
            <SwapOutlined className="project-card__tasks-icon" />
            <Text className="project-card__tasks-count">
              {project.taskCount} TASKS
            </Text>
          </div>
          <Text className="project-card__updated">
            Last updated {formatRelativeDate(project.lastUpdated)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
