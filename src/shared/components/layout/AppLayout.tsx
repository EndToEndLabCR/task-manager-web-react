import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../side-bar/Sidebar";
import "./AppLayout.scss";

const AppLayout: React.FC = () => (
  <div className="app-layout">
    <Sidebar />
    <main className="app-layout__content">
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
