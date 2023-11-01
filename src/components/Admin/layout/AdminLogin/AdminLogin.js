import { Button, Card, Form, Input, Space } from "antd";
import "./AdminLogin.css";
import { adminAuthService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const loginHandle = async (loginForm) => {
    try {
      const loginRes = await adminAuthService.login(loginForm);
      adminAuthService.saveAuthInfo(loginRes.data);
      console.log(adminAuthService.getAuthInfo);
      console.log(loginForm);
      console.log(loginRes.data);
      toastService.success("Login success");
      navigate("/admin");
    } catch (error) {
      const message = error.apiMessage;
      // console.log(adminAuthService.getAuthInfo);
      // console.log(loginForm);
      toastService.error("Error occur", message);
    }
  };

  return (
    <div className="admin_login">
      <Space direction="vertical" size={16}>
        <Card style={{ width: 500 }}>
          <Form
            onFinish={loginHandle}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export { AdminLogin };
