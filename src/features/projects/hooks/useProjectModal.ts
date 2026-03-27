import { useState } from "react";
import type { Project, ProjectFormValues } from "../types/project.types";

export const useProjectModal = (
  updateProject: (values: ProjectFormValues, projectId?: string) => void,
  projects: Project[]  ) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleNewProject = (): void => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string): void => {
    const project = projects.find((p) => p.id === id) ?? null;
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleModalSubmit = (values: ProjectFormValues): void => {
    setModalLoading(true);
    updateProject(values, editingProject?.id);
    setModalLoading(false);
    setModalOpen(false);
    setEditingProject(null);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
    setEditingProject(null);
  };

  return {
    modalOpen,
    modalLoading,
    editingProject,
    handleEdit,
    setModalOpen, 
    handleNewProject,
    handleModalSubmit,
    handleModalClose,
  };
};
