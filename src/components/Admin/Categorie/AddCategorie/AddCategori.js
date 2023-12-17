import { Button, Form, Input, Modal } from "antd";
import { categoryService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddCategory = ({ onCategoryFinish, open, onCancel }) => {
  const navigate = useNavigate();
  const [categoryForm] = Form.useForm();

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

  const addCategorylHandle = async (form) => {
    try {
      const res = categoryService.createCategory(form);
      categoryForm.resetFields();
      toastService.success("Thêm loại áo thành công");
      const data = res.data;
      onCategoryFinish(data);
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm loại áo" open={open} footer={null} onCancel={onCancel}>
      <Form
        onFinish={addCategorylHandle}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={categoryForm}
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

export { AddCategory};