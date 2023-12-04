import { Button, Form, Input } from "antd";
import { brandService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const UpdateBrand = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [brand, setBrand] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const body = await brandService.getOne(id);
      setBrand(body.data);
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
        nameBrand: form.nameBrand,
        description: form.description
      };
      brandService.createBrands(formData);
      console.log(formData);
      toastService.success("Cập nhật thương hiệu thành công");
      navigate("/admin/brand");
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
        name="nameBrand"
        rules={[{ required: true, message: "Tên thương hiệu không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Mô tả thương hiệu không được trống" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật thương hiệu
        </Button>
      </Form.Item>
    </Form>
  );
};

export { UpdateBrand };
