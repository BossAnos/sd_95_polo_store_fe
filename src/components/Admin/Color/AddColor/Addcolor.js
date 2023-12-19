import { Button, Form, Input, Modal } from "antd";
import { colorService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddColor = (props) => {
  const navigate = useNavigate();
  const [colorForm] = Form.useForm();

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

  const addColorlHandle = async (form) => {
    try {
      colorService.createColor(form);
      colorForm.resetFields();
      props.onColorFinish();
      toastService.success("Thêm màu sắc thành công");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm màu sắc" open={props.open} footer={null} onCancel={props.onCancel}>
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