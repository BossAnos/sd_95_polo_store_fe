import { Form, Input, Modal } from "antd";
import { roleService } from "../../../../service/admin";
import { useNavigate } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddRole = (props) => {
  const navigate = useNavigate();
  const [roleForm] = Form.useForm();

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


  const addRolelHandle = async (form) => {
    try {
      roleService.createColor(form);
      roleForm.resetFields();
      props.onRoleFinish();
      toastService.success("Thêm chức vụ thành công");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm chức vụ" open={props.open} footer={null} onCancel={props.onCancel}>
      <Form
        onFinish={addRolelHandle}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={roleForm}
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

export { AddRole };