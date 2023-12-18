import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebaseConfig";
import { Upload, Button, Form, Input, Avatar, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { userAuthService } from "../../../service/user";

const SignUp = () => {
  const [form] = Form.useForm();
  const [avatarURL, setAvatarURL] = useState(null);
  const navigate = useNavigate();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (showSuccessNotification) {
      notification.success({
        message: "Đăng ký thành công",
        description: "Bạn đã đăng ký thành công. Hãy đăng nhập để tiếp tục!",
      });
    }
  }, [showSuccessNotification]);

  const validateEmail = async (_, value) => {
    if (value) {
      const isUsed = await isEmailAlreadyUsed(value);
      if (isUsed) {
        return Promise.reject("Email đã được sử dụng!");
      }
    }
    return Promise.resolve();
  };

  const validatePhone = async (_, value) => {
    if (value) {
      const isUsed = await isPhoneAlreadyUsed(value);
      if (isUsed) {
        return Promise.reject("Số điện thoại đã được sử dụng!");
      }
    }
    return Promise.resolve();
  };

  const customRequest = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append("file", file);

    const storageRef = storage.ref();
    const avatarRef = storageRef.child(file.name);

    avatarRef
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((downloadURL) => {
        onSuccess();
        setAvatarURL(downloadURL);
        console.log("Avatar URL:", downloadURL); // Log the avatar URL
        form.setFieldsValue({ avatar: downloadURL });
      })
      .catch((error) => {
        console.error("Error during avatar upload:", error);
      });
  };

  const isEmailAlreadyUsed = async (email) => {
    // Assuming userAuthService has a method to check if the email is already in use
    const response = await userAuthService.checkEmailAvailability(email);
    return !response.available; // Return true if email is NOT available
  };

  const isPhoneAlreadyUsed = async (phone) => {
    // Assuming userAuthService has a method to check if the phone is already in use
    const response = await userAuthService.checkPhoneAvailability(phone);
    return !response.available; // Return true if phone is NOT available
  };

  const compareToFirstPassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (value && value !== password) {
      return Promise.reject("Xác nhận mật khẩu không trùng khớp!");
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (value && value.length < 6) {
      return Promise.reject("Mật khẩu phải có ít nhất 6 ký tự!");
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      const signUpForm = { ...values, avatarURL };
      const response = await userAuthService.signUp(signUpForm);
      console.log(signUpForm);
      // Show success notification
      notification.success({
        message: "Đăng ký thành công",
        description: "Bạn đã đăng ký thành công. Hãy đăng nhập để tiếp tục!",
      });

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error during SignUp:", error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ display: "flex", paddingLeft: "200px" }}
    >
      <div style={{ marginLeft: "50px", paddingTop: "30px" }}>
        <Form.Item name="avatar">
          <Upload
            customRequest={customRequest}
            showUploadList={false}
            onChange={() => form.setFieldsValue({ avatar: avatarURL })}
          >
            <Avatar
              size={250}
              src={
                avatarURL ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Upload>
        </Form.Item>
      </div>

      <div style={{ paddingTop: "40px", marginRight: "300px" }}>
        <Form.Item
          label="Họ và Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input style={{ width: "400px" }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
            { validator: validateEmail },
          ]}
        >
          <Input type="email" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { validator: validatePhone },
          ]}
        >
          <Input type="tel" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            { validator: compareToFirstPassword },
          ]}
        >
          <Input.Password style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <button type="primary" htmlType="submit">
            Đăng ký
          </button>
        </Form.Item>
      </div>
    </Form>
  );
};

export { SignUp };
