import { Button, Form, Input, Modal } from "antd";
import { sizeService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddSize = ({ onSizeFinish, open, onCancel }) => {
  const navigate = useNavigate();
  const [sizeForm] = Form.useForm();

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

  const validateNumber = (rule, value, callback) => {
    if (isNaN(value)) {
      callback("Vui lòng nhập số");
    } else {
      callback();
    }
  };

  const addSizelHandle = async (form) => {
    try {
      const res = sizeService.createSize(form);
      sizeForm.resetFields();
      toastService.success("Thêm size thành công");
      const data = res.data;
      onSizeFinish(data);
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm size" visible={open} footer={null} onCancel={onCancel}>
      <Form
        form={sizeForm}
        onFinish={addSizelHandle}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            { required: true, message: "Tên không được trống" },
            { validator: validateInput },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: "Mô tả không được trống" },
            { validator: validateInput },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Chiều dài áo"
          name="shirtlength"
          rules={[
            { required: true, message: "Chiều dài áo không được trống" },
            { validator: validateNumber },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Độ rộng áo"
          name="shirtwidth"
          rules={[
            { required: true, message: "Độ rộng áo không được trống" },
            { validator: validateNumber },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Chiều dài tay áo"
          name="sleevelength"
          rules={[
            { required: true, message: "Chiều dài tay áo không được trống" },
            { validator: validateNumber },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Chiều dài vai"
          name="shoulderlength"
          rules={[
            { required: true, message: "Chiều dài vai không được trống" },
            { validator: validateNumber },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <button type="primary" htmlType="submit">
            Thêm size
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { AddSize };