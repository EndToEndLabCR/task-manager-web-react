import React from "react";
import AppNavbar from "../../../../shared/components/nav-bar/AppNavbar";
import AppFooter from "../../../../shared/components/footer/AppFooter";
import RegisterForm from "../../pages/register/components/RegisterForm";
import "./Register.scss";

const Register: React.FC = () => (
  <div className="register">
    <AppNavbar showHelpCenter={false} />
    <main className="register__main">
      <RegisterForm />
    </main>
    <AppFooter />
  </div>
);

export default Register;