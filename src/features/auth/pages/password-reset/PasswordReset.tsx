import React from "react";
import AppNavbar from "../../../../shared/components/nav-bar/AppNavbar";
import AppFooter from "../../../../shared/components/footer/AppFooter";
import PasswordResetForm from "../../components/password-reset-form/PasswordResetForm";
import "./PasswordReset.scss";

const PasswordReset: React.FC = () => (
  <div className="password-reset">
    <AppNavbar showHelpCenter={false} />
    <main className="password-reset__main">
      <PasswordResetForm />
    </main>
    <AppFooter />
  </div>
);

export default PasswordReset;