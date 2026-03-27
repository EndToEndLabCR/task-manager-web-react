import React from "react";
import { Typography } from "antd";
import { AppstoreOutlined, CheckCircleOutlined, FolderOutlined, CalendarOutlined,SettingOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import type { SidebarProps } from "./sidebar.types";
import { MOCK_USER } from "../../../features/auth/mocks/auth.mock";
import type { NavItem } from './sidebar.types';
import "./Sidebar.scss";

const { Text } = Typography;

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <AppstoreOutlined />, path: "/dashboard" },
  { key: "tasks", label: "My Tasks", icon: <CheckCircleOutlined />, path: "/tasks" },
  { key: "projects", label: "Projects", icon: <FolderOutlined />, path: "/projects" },
  { key: "calendar", label: "Calendar", icon: <CalendarOutlined />, path: "/calendar" },
];

const Sidebar: React.FC<SidebarProps> = ({ user = MOCK_USER }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean =>
    location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo" onClick={() => navigate("/")} role="button" tabIndex={0}>
        <span className="sidebar__logo-icon">✔</span>
        <span className="sidebar__logo-text">TaskFlow</span>
      </div>

      {/* Nav items */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`sidebar__nav-item ${isActive(item.path) ? "sidebar__nav-item--active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="sidebar__bottom">
        {/* Settings */}
        <button
          className={`sidebar__nav-item ${isActive("/settings") ? "sidebar__nav-item--active" : ""}`}
          onClick={() => navigate("/settings")}
        >
          <span className="sidebar__nav-icon"><SettingOutlined /></span>
          <span className="sidebar__nav-label">Settings</span>
        </button>

        {/* User profile */}
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="sidebar__user-avatar-img" />
            ) : (
              <span className="sidebar__user-avatar-initials">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            )}
          </div>
          <div className="sidebar__user-info">
            <Text className="sidebar__user-name">{user.name}</Text>
            <Text className="sidebar__user-role">{user.role}</Text>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;