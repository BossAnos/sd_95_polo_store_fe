import { Button, Form, Input } from "antd";
import { materialService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const UpdateMaterial = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [material, setMaterial] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const body = await materialService.getOne(id);
      setMaterial(body.data);
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
      materialService.createMaterial(formData);
      console.log(formData);
      toastService.success("Cập nhật chất liệu thành công");
      navigate("/admin/material");
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
        rules={[{ required: true, message: "Tên chất liệu không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Mô tả chất liệu không được trống" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật chất liệu
        </Button>
      </Form.Item>
    </Form>
  );
};

export { UpdateMaterial };
