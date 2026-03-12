import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";

const Home = lazy(() => import("../features/auth/pages/home/Home"));
const Login = lazy(() => import("../features/auth/pages/login/Login"));
const Register = lazy(() => import("../features/auth/pages/register/Register"));  

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Spin size="large" fullscreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;