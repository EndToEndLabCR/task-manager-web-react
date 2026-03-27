import React from "react";
import { Typography, Dropdown, Popconfirm } from "antd";
import type { MenuProps } from "antd";
import { SwapOutlined, MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Project } from "../../types/project.types";
import { PROJECT_COLORS } from "../../mocks/projects.mock";
import { formatRelativeDate } from "../../../../shared/utils/date.utils";
import "./ProjectListItem.scss";

const { Text, Paragraph } = Typography;

interface ProjectListItemProps {
  project: Project;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  onView,
  onEdit,
  onDelete,
}) => {
  const color = PROJECT_COLORS[project.color];

  const menuItems: MenuProps["items"] = [
    { key: "view", icon: <EyeOutlined />, label: "View", 
      onClick: ({ domEvent }) => { domEvent.stopPropagation(); onView(project.id); },
    },
    { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: ({ domEvent }) => {
      domEvent.stopPropagation(); 
      onEdit(project.id); },
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
]; 

  return (
    <div className="project-list-item" onClick={() => onView(project.id)}>
      <div className="project-list-item__color-dot" style={{ backgroundColor: color }} />

      <div className="project-list-item__info">
        <Text className="project-list-item__name">{project.name}</Text>
        <Paragraph className="project-list-item__description" ellipsis={{ rows: 1 }}>
          {project.description}
        </Paragraph>
      </div>

      <div className="project-list-item__tasks">
        <SwapOutlined />
        <Text>{project.taskCount} TASKS</Text>
      </div>

      <Text className="project-list-item__updated">
        Last updated {formatRelativeDate(project.lastUpdated)}
      </Text>

      <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
        <button
          className="project-list-item__menu-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreOutlined />
        </button>
      </Dropdown>
    </div>
  );
};

export default ProjectListItem;
