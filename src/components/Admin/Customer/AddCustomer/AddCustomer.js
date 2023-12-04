import { Button, Form, Input } from "antd";
import { customerService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
const AddCustomer = () => {
  const navigate = useNavigate();
  const addCustomerlHandle = async (form) => {
    try {
      customerService.createCustomer(form);
      toastService.success("Thêm khách hàng thành công");
      navigate("/admin/customer");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Form
      onFinish={addCustomerlHandle}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Thêm khách hàng 
        </Button>
      </Form.Item>
    </Form>
  );
};

export { AddCustomer };
