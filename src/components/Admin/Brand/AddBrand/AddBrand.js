import { Button, Form, Input, Modal } from "antd";
import { brandService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddBrand = ({ onBrandFinish, open, onCancel }) => {
  const navigate = useNavigate();
  const [brandForm] = Form.useForm();

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

  const addBrandlHandle = async (form) => {
    try {
      const res = brandService.createBrands(form);
      brandForm.resetFields();
      toastService.success("Thêm thương hiệu thành công");
      const data = res.data;
      onBrandFinish(data);
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm thương hiệu" open={open} footer={null} onCancel={onCancel}>
      <Form
        onFinish={addBrandlHandle}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={brandForm}
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
            Thêm thương hiệu
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { AddBrand };