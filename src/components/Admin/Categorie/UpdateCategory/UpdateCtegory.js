import { Button, Form, Input } from "antd";
import { categoryService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const UpdateCategory= () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const body = await categoryService.getOne(id);
      setCategory(body.data);
      console.log(body.data);
      form.setFieldsValue({
        ...body.data,
      });
    })();
  }, []);

  const updateHandle = async (form) => {
    try {
      const formData = {
        id: id,
        name: form.name,
        description: form.description
      };
      categoryService.createCategory(formData);
      console.log(formData);
      toastService.success("Cập nhật loại áo  thành công");
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Form
      form={form}
      onFinish={updateHandle}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Tên loại áo  không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Mô tả loại áo  không được trống" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật loại áo 
        </Button>
      </Form.Item>
    </Form>
  );
};

export { UpdateCategory };
