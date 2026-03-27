import React from "react";
import { Drawer, Button, Radio,  Space } from "antd";
import type { ProjectFilters, ProjectColor } from "../../types/project.types";
import { PROJECT_COLORS } from "../../mocks/projects.mock";
import "./ProjectFilterDrawer.scss";

interface ProjectFilterDrawerProps {
  open: boolean;
  filters: ProjectFilters;
  onClose: () => void;
  onFilterChange: (filters: Partial<ProjectFilters>) => void;
  onReset: () => void;
}

const COLOR_OPTIONS: ProjectColor[] = ["blue", "purple", "green", "orange", "red", "pink"];

const ProjectFilterDrawer: React.FC<ProjectFilterDrawerProps> = ({
  open,
  filters,
  onClose,
  onFilterChange,
  onReset,
}) => {
  return (
    <Drawer
      title="Filter Projects"
      open={open}
      onClose={onClose}
      width={320}
      footer={
        <Space className="project-filter-drawer__footer">
          <Button onClick={onReset}>Reset</Button>
          <Button type="primary" onClick={onClose}>Apply</Button>
        </Space>
      }
    >
      {/* Color filter */}
      <div className="project-filter-drawer__section">
        <p className="project-filter-drawer__label">Color</p>
        <div className="project-filter-drawer__colors">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color}
              className={`project-filter-drawer__color-btn ${
                filters.colors.includes(color) ? "project-filter-drawer__color-btn--active" : ""
              }`}
              style={{ backgroundColor: PROJECT_COLORS[color] }}
              onClick={() => {
                const updated = filters.colors.includes(color)
                  ? filters.colors.filter((c) => c !== color)
                  : [...filters.colors, color];
                onFilterChange({ colors: updated });
              }}
            />
          ))}
        </div>
      </div>

      {/* Tasks filter */}
      <div className="project-filter-drawer__section">
        <p className="project-filter-drawer__label">Tasks</p>
        <Radio.Group
          value={filters.hasTasks}
          onChange={(e) => onFilterChange({ hasTasks: e.target.value })}
        >
          <Space direction="vertical">
            <Radio value={null}>All projects</Radio>
            <Radio value={true}>With tasks</Radio>
            <Radio value={false}>Without tasks</Radio>
          </Space>
        </Radio.Group>
      </div>
    </Drawer>
  );
};

export default ProjectFilterDrawer;
