import { Button, Form, Input,Modal } from "antd";
import { colorService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import XRegExp from "xregexp";
const UpdateColor = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [colorForm] = Form.useForm();
  const [color, setColor] = useState({});
  const [form] = Form.useForm();

  const validateInput = (rule, value, callback) => {
    const regex = XRegExp("^[\\p{L}0-9\\s^%/().,]+$");
    const maxLength = 200;

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
      const body = await colorService.getOne(id);
      setColor(body.data);
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
      const res = colorService.createColor(formData);
      colorForm.resetFields();
      toastService.success("Cập nhật màu sắc thành công");
      navigate("/admin/color");
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
          Cập nhật màu sắc
        </button>
      </Form.Item>
    </Form>

  );
};

export { UpdateColor };
