import React, { useState } from "react";
import { Typography } from "antd";
import ProjectsHeader from "../../components/projects-header/ProjectsHeader";
import ProjectListItem from "../../components/project-list-item/ProjectListItem";
import ProjectGrid from "../../components/project-grid/ProjectGrid";
import ProjectFormModal from "../../components/project-form-modal/ProjectFormModal";
import ProjectFilterDrawer from "../../components/project-filter-drawer/ProjectFilterDrawer";
import ProjectsEmpty from "../../components/projects-empty/ProjectsEmpty";
import { useProjects } from "../../hooks/useProjects";
import { useProjectModal } from "../../hooks/useProjectModal";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import type { ViewMode } from "../../types/project.types";
import { Row, Col, Skeleton } from "antd";
import "./Projects.scss";

const { Text } = Typography;

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const {
    sortedProjects,
    loading,
    handleView,
    handleDelete,
    handleSort,
    updateProject,} = useProjects();

  const {
    modalOpen,
    modalLoading,
    editingProject,
    handleNewProject,
    handleEdit,
    handleModalSubmit,
    handleModalClose,} = useProjectModal(updateProject, sortedProjects); 

  const {
    filters,
    filterDrawerOpen,
    activeFilterCount,
    setFilterDrawerOpen,
    applyFilters,
    handleFilterChange,
    handleResetFilters,
  } = useProjectFilters();

const filteredProjects = applyFilters(sortedProjects);

  return (
    <div className="projects">
      <ProjectsHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNewProject={handleNewProject}
        onSort={handleSort}
        onFilter={() => setFilterDrawerOpen(true)} 
        activeFilterCount={activeFilterCount}
        isEmpty={sortedProjects.length === 0}
      />

    {loading && (
      <Row gutter={[24, 24]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Col key={i} xs={24} sm={12} lg={8}>
            <Skeleton active className="projects__skeleton" />
          </Col>
        ))}
      </Row>
    )}

    {!loading && filteredProjects.length === 0 && (
      <ProjectsEmpty onNewProject={handleNewProject} />
    )}

    {!loading && viewMode === "grid" && filteredProjects.length > 0 && (
      <ProjectGrid
        projects={filteredProjects}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    )}

    {!loading && viewMode === "list" && filteredProjects.length > 0 && (
        <div className="projects__list">
          {filteredProjects.map((project) => (
            <ProjectListItem
              key={project.id}
              project={project}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
    )}

      {!loading && (
        <div className="projects__footer">
          <Text className="projects__count">
            Showing {filteredProjects.length} projects
          </Text>
          <button className="projects__archived-link">View Archived</button>
        </div>
    )}

      <ProjectFormModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        loading={modalLoading}
        initialValues={editingProject ?? undefined}
      />

      <ProjectFilterDrawer
        open={filterDrawerOpen}
        filters={filters}
        onClose={() => setFilterDrawerOpen(false)}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
};

export default Projects;