import type { Project } from "../types/project.types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Q4 Marketing Campaign",
    description: "Execution and strategy for the upcoming year-end holiday season campaigns.",
    color: "blue",
    taskCount: 12,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2d ago
    createdAt: "2024-10-01",
  },
  {
    id: "2",
    name: "Mobile App Redesign",
    description: "Revamping the user experience and visual identity for our iOS and Android apps.",
    color: "purple",
    taskCount: 28,
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
    createdAt: "2024-09-15",
  },
  {
    id: "3",
    name: "API Integration",
    description: "Connecting our internal dashboard with 3rd party logistics providers and services.",
    color: "green",
    taskCount: 8,
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1d ago
    createdAt: "2024-10-10",
  },
  {
    id: "4",
    name: "Security Audit",
    description: "Comprehensive review of infrastructure security, data handling and compliance.",
    color: "orange",
    taskCount: 15,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3d ago
    createdAt: "2024-09-20",
  },
  {
    id: "5",
    name: "Sales CRM Cleanup",
    description: "Data migration and deduplication of client records to improve sales funnel tracking.",
    color: "red",
    taskCount: 6,
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5d ago
    createdAt: "2024-09-05",
  },
  {
    id: "6",
    name: "Employee Onboarding",
    description: "Automating the documentation and equipment provisioning process for new hires.",
    color: "pink",
    taskCount: 21,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1w ago
    createdAt: "2024-08-30",
  },
];

export const PROJECT_COLORS: Record<string, string> = {
  blue: "#1677ff",
  purple: "#722ed1",
  green: "#52c41a",
  orange: "#fa8c16",
  red: "#f5222d",
  pink: "#eb2f96",
};
