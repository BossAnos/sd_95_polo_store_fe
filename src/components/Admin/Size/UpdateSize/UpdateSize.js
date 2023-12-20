import { Button, Form, Input } from "antd";
import { sizeService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import XRegExp from "xregexp";
const UpdateSize = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [size, setSize] = useState({});
  const [form] = Form.useForm();
  const validateInput = (rule, value, callback) => {
    const regex = XRegExp("^[\\p{L}0-9\\s]+$");
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
      const body = await sizeService.getOne(id);
      setSize(body.data);
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
        description: form.description,
        shirtlength: form.shirtlength,
        shirtwidth: form.shirtwidth,
        sleevelenght:form.sleevelenght,
        shoulderlength: form.shoulderlength,
        
      };
      sizeService.createSize(formData);
      console.log(formData);
      toastService.success("Cập nhật size thành công");
      navigate("/admin/size");
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
      <Form.Item
        label="shirtlength"
        name="shirtlength"
        rules={[{ required: true, message: "shirtlength không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="shirtwidth"
        name="shirtwidth"
        rules={[{ required: true, message: "shirtwidth không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="sleevelenght"
        name="sleevelenght"
        rules={[{ required: true, message: "sleevelenght không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="shoulderlength"
        name="shoulderlength"
        rules={[{ required: true, message: "shoulderlength không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <button type="primary" htmlType="submit">
          Cập nhật size
        </button>
      </Form.Item>
    </Form>
  );
};

export { UpdateSize };
