import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../shared/components/layout/AppLayout";

// Auth pages
const Home = lazy(() => import("../features/home/pages/Home"));
const Login = lazy(() => import("../features/auth/pages/login/Login"));
const Register = lazy(() => import("../features/auth/pages/register/Register"));  
const PasswordReset = lazy(() => import("../features/auth/pages/password-reset/PasswordReset"));

// App pages
const Projects = lazy(() => import("../features/projects/pages/projects/Projects"));
const ProjectDetail = lazy(() => import("../features/projects/pages/project-detail/ProjectDetail"));
const Tasks = lazy(() => import("../features/tasks/pages/tasks/Tasks"));
const Dashboard = lazy(() => import("../features/dashboard/pages/dasboard/Dashboard"));

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Spin size="large" fullscreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      
      {/* Protected routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;