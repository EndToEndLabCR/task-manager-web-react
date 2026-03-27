import { useState } from "react";
import type { Project, ProjectFilters } from "../types/project.types";
import { DEFAULT_FILTERS } from "../types/project.types";

export const useProjectFilters = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);

  const applyFilters = (projects: Project[]): Project[] => {
    return projects.filter((p) => {
      if (filters.colors.length > 0 && !filters.colors.includes(p.color)) return false;
      if (filters.hasTasks === true && p.taskCount === 0) return false;
      if (filters.hasTasks === false && p.taskCount > 0) return false;
      return true;
    });
  };

  const handleFilterChange = (newFilters: Partial<ProjectFilters>): void => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = (): void => {
    setFilters(DEFAULT_FILTERS);
  };

  const activeFilterCount =
    filters.colors.length + (filters.hasTasks !== null ? 1 : 0);

  return {
    filters,
    filterDrawerOpen,
    activeFilterCount,
    setFilterDrawerOpen,
    applyFilters,
    handleFilterChange,
    handleResetFilters,
  };
};
