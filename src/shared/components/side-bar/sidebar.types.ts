export interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export interface Sidebar {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface SidebarProps {
  user?: Sidebar;
}
