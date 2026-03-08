import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  Typography,
  Divider,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

const { Title, Paragraph, Text } = Typography;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading] = useState<boolean>(false);

  return (
    <Card className="login-form__card" bordered={false}>

      {/* Header */}
      <div className="login-form__header">
        <Title level={2} className="login-form__title">
          Welcome back
        </Title>
        <Paragraph className="login-form__subtitle">
          Enter your credentials to access your tasks.
        </Paragraph>
      </div>

      {/* Form */}
      <Form
        layout="vertical"
        requiredMark={false}
        autoComplete="off"
      >
        <Form.Item
          label="Email or Username"
          name="identifier"
          rules={[{ required: true, message: "Please enter your email or username" }]}
        >
          <Input
            placeholder="alex.smith@taskflow.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            placeholder="••••••••••"
            size="large"
          />
        </Form.Item>

        <div className="login-form__extras">
          <Form.Item name="rememberMe" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button
            type="link"
            className="login-form__forgot"
            onClick={() => navigate("/password-reset")}
          >
            Forgot password?
          </Button>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            className="login-form__submit-btn"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      {/* Sign up link */}
      <div className="login-form__signup">
        <Text>Don't have an account? </Text>
        <Button
          type="link"
          className="login-form__signup-link"
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
      </div>

    </Card>
  );
};

export default LoginForm;