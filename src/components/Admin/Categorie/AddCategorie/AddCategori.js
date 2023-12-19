import { Button, Form, Input, Modal } from "antd";
import { categoryService } from "../../../../service/admin";
import { useNavigate } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddCategory = (props) => {
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
      categoryService.createCategory(form);
      categoryForm.resetFields();
      props.onCategoryFinish();
      toastService.success("Thêm loại áo thành công");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm loại áo" open={props.open} footer={null} onCancel={props.onCancel}>
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
            Thêm loại áo
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { AddCategory};