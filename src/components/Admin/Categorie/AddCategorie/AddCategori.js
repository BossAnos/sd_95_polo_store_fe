import { Button, Form, Input } from "antd";
import { categoryService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
const AddCategory = () => {
  const navigate = useNavigate();
  const addCategorylHandle = async (form) => {
    try {   
      categoryService.createCategory(form);
      toastService.success("Thêm loại áo thành công");
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Form
      onFinish={addCategorylHandle}
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
        rules={[{ required: true, message: "Mô tả không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <button type="primary" htmlType="submit">
          Thêm loại áo 
        </button>
      </Form.Item>
    </Form>
  );
};

export { AddCategory };
