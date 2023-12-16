import { Button, Form, Input, Modal } from "antd";
import { colorService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
const AddColor = ({ onColorFinish, open, onCancel }) => {
  const navigate = useNavigate();
  const [colorForm] = Form.useForm();

  const validateInput = (rule, value, callback) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    const maxLength = 50;

    if (value && value.length > maxLength) {
      callback(`Không vượt quá ${maxLength} kí tự`);
    } else if (value && !regex.test(value)) {
      callback("Không chứa ký tự đặc biệt");
    } else {
      callback();
    }
  };

  const addColorlHandle = async (form) => {
    try {
      const res = colorService.createColor(form);
      colorForm.resetFields();
      toastService.success("Thêm màu sắc thành công");
      const data = res.data;
      onColorFinish(data);
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm màu sắc" open={open} footer={null} onCancel={onCancel}>
      <Form
        onFinish={addColorlHandle}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={colorForm}
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
        <Form.Item wrapperCol={{ offset: 4 }}>
          <button type="primary" htmlType="submit">
            Thêm màu sắc
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { AddColor };