import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Divider,
  Card,
  Progress,
} from "antd";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.scss";

const { Title, Paragraph, Text } = Typography;

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 25, label: "WEAK", color: "#ff4d4f" };
  if (score === 2) return { score: 50, label: "MEDIUM", color: "#faad14" };
  if (score === 3) return { score: 75, label: "STRONG", color: "#52c41a" };
  return { score: 100, label: "VERY STRONG", color: "#1677ff" };
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");

  const passwordStrength = getPasswordStrength(passwordValue);

  const handleSubmit = (values: RegisterFormValues): void => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <Card className="register-form__card" bordered={false}>

      {/* Header */}
      <div className="register-form__header">
        <Title level={2} className="register-form__title">
          Create your account
        </Title>
        <Paragraph className="register-form__subtitle">
          Start managing your tasks effectively today.
        </Paragraph>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
        autoComplete="off"
      >
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="you@example.com" size="large" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please enter a username" },
            { min: 3, message: "Username must be at least 3 characters" },
          ]}
        >
          <Input placeholder="johndoe" size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter a password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            placeholder="••••••••"
            size="large"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Item>

        {/* Password strength indicator */}
        {passwordValue && (
          <div className="register-form__strength">
            <Progress
              percent={passwordStrength.score}
              showInfo={false}
              strokeColor={passwordStrength.color}
              trailColor="#f0f0f0"
              size="small"
              className="register-form__strength-bar"
            />
            <div className="register-form__strength-info">
              <Text
                className="register-form__strength-label"
                style={{ color: passwordStrength.color }}
              >
                {passwordStrength.label}
              </Text>
              <Text className="register-form__strength-hint">
                Use symbols for a stronger password
              </Text>
            </div>
          </div>
        )}

        <Form.Item style={{ marginTop: passwordValue ? 0 : undefined }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            className="register-form__submit-btn"
          >
            Create account
          </Button>
        </Form.Item>
      </Form>

      {/* Log in link */}
      <div className="register-form__login">
        <Text>Already have an account? </Text>
        <Button
          type="link"
          className="register-form__login-link"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </div>

    </Card>
  );
};

export default RegisterForm;