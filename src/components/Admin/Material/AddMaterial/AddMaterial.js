import { Form, Input, Modal } from "antd";
import { materialService } from "../../../../service/admin";
import { useNavigate } from "react-router-dom";
import { toastService } from "../../../../service/common";
import XRegExp from "xregexp";
const AddMaterial = (props) => {
  const navigate = useNavigate();
  const [materiaForm] = Form.useForm();

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

  const addMaterialHandle = async (form) => {
    try {
      materialService.createMaterial(form);
      materiaForm.resetFields();
      toastService.success("Thêm chất liệu thành công");
      props.onMaterialFinish();
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Modal title="Thêm chất liệu" open={props.open} footer={null} onCancel={props.onCancel}>
      <Form
        onFinish={addMaterialHandle}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={materiaForm}
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
            Thêm chất liệu
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { AddMaterial };