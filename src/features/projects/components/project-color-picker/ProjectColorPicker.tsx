import React from "react";
import { Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import type { ProjectColor, ProjectColorPickerProps } from "../../types/project.types";
import { PROJECT_COLORS } from "../../mocks/projects.mock";
import "./ProjectColorPicker.scss";

const ProjectColorPicker: React.FC<ProjectColorPickerProps> = ({
  value,
  onChange,
}) => (
  <div className="project-color-picker">
    {Object.entries(PROJECT_COLORS).map(([key, hex]) => (
      <Tooltip key={key} title={key.charAt(0).toUpperCase() + key.slice(1)}>
        <button
          type="button"
          className={`project-color-picker__swatch ${value === key ? "project-color-picker__swatch--selected" : ""}`}
          style={{ backgroundColor: hex }}
          onClick={() => onChange?.(key as ProjectColor)}
        >
          {value === key && <CheckOutlined className="project-color-picker__check" />}
        </button>
      </Tooltip>
    ))}
  </div>
);

export default ProjectColorPicker;
