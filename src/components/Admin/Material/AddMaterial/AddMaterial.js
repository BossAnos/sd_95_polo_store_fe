import { Button, Form, Input } from "antd";
import { materialService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
const AddMaterial = () => {
  const navigate = useNavigate();
  const addMateriallHandle = async (form) => {
    try {
     materialService.createMaterial(form);
      toastService.success("Thêm chất liệu thành công");
      navigate("/admin/material");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Form
      onFinish={addMateriallHandle}
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
        label="Tên"
        name="description"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <button type="primary" htmlType="submit">
          Thêm chất liệu 
        </button>
      </Form.Item>
    </Form>
  );
};

export { AddMaterial };
