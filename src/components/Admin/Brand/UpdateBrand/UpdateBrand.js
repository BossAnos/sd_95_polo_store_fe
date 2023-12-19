import { Button, Form, Input } from "antd";
import { brandService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import XRegExp from "xregexp";
const UpdateBrand = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [brand, setBrand] = useState({});
  const [form] = Form.useForm();
  const validateInput = (rule, value, callback) => {
    const regex = XRegExp("^[\\p{L}0-9\\s]+$");
    const maxLength = 50;

    if (value && value.length > maxLength) {
      callback(`Không vượt quá ${maxLength} kí tự`);
    } else if (value && !regex.test(value)) {
      callback("Không chứa ký tự đặc biệt");
    } else {
      callback();
    }
  };
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
        name: form.name,
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
        name="name"
        rules={[  { required: true, message: "Tên không được trống" },
        { validator: validateInput },]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[   { required: true, message: "Mô tả không được trống" },
        { validator: validateInput },]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <button type="primary" htmlType="submit">
          Cập nhật thương hiệu
        </button>
      </Form.Item>
    </Form>
  );
};

export { UpdateBrand };
