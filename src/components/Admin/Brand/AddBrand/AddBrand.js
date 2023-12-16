import { Button, Form, Input } from "antd";
import { brandService } from "../../../../service/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
const AddBrand = ({ onAddBrandFinish, open, onCancel }) => {
  const navigate = useNavigate();
  const addBrandlHandle = async (form) => {
    try {
      brandService.createBrands(form);
      toastService.success("Thêm thương hiệu thành công");
      navigate("/admin/brand");
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
  };

  return (
    <Form
      onFinish={addBrandlHandle}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        label="Tên"
        name="nameBrand"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="description"
        rules={[{ required: true, message: "Tên không được trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <button type="primary" htmlType="submit">
          Thêm thương hiệu
        </button>
      </Form.Item>
    </Form>
  );
};

export { AddBrand };
