import { Button, Form, Input } from "antd";
import { sizeService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
const AddSize = () => {
  const navigate = useNavigate();
  const addSizelHandle = async (form) => {
    try {
      sizeService.createSize(form);
      toastService.success("Thêm size thành công");
      navigate("/admin/size");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Form
      onFinish={addSizelHandle}
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
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Mô tả không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="shirtlength"
        name="shirtlength"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="shirtwidth"
        name="shirtwidth"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="sleevelenght"
        name="sleevelenght"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="shoulderlength"
        name="shoulderlength"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <button type="primary" htmlType="submit">
          Thêm size 
        </button>
      </Form.Item>
    </Form>
  );
};

export { AddSize };
