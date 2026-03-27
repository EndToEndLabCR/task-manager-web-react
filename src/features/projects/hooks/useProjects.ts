import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Project, SortOption, ProjectFormValues } from "../types/project.types";
import { MOCK_PROJECTS } from "../mocks/projects.mock";

export const useProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [loading, setLoading] = useState<boolean>(false);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "tasks") return b.taskCount - a.taskCount;
      return a.createdAt > b.createdAt ? -1 : 1;
    });
  }, [sortBy, projects]);

  const handleView = (id: string): void => {
    navigate(`/projects/${id}`);
  };


  const handleDelete = (id: string): void => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSort = (): void => {
    setSortBy((prev) => (prev === "date" ? "name" : prev === "name" ? "tasks" : "date"));
  };

const updateProject = (values: ProjectFormValues, projectId?: string): void => {
    if (projectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, ...values, lastUpdated: new Date().toISOString() }
            : p
        )
      );
    } else {
      const newProject: Project = {
        id: crypto.randomUUID(),
        ...values,
        description: values.description ?? "",
        taskCount: 0,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) => [newProject, ...prev]);
    }
  };

 return {
    sortedProjects,
    loading,
    setLoading,
    handleView,
    handleDelete,
    handleSort,
    updateProject,  
  };
};
