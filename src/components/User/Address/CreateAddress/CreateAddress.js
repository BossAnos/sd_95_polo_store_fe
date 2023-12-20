import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { addressService, userAuthService } from "../../../../service/user";
import { useNavigate, useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";

const AddAddress = ({ onAddress, open, onCancel, onAddSuccess }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(open);
  const [addressForm] = Form.useForm();
  const AddAddress = async () => {
    const formValue = addressForm.getFieldsValue();
    const userInfo = userAuthService.getAuthInfo();
    try {
      const res = await addressService.AddAddress(userInfo.id, formValue);
      userInfo.address.push(res.data);
      console.log(res);
      userAuthService.saveAuthInfo(userInfo);
      addressForm.resetFields();
      toastService.success("Thêm màu sắc thành công");
      const data = res.data;
      onAddress(data);
      console.log(res.data);
      onAddSuccess(data); // Gọi onAddSuccess với địa chỉ vừa thêm
    } catch (error) {
      console.log(error);
      toastService.error(error.apiMessage);
    }
    setVisible(false);
  };

  return (
    <Modal
      title="Thêm địa chỉ"
      visible={visible}
      open={open}
      footer={null}
      onCancel={onCancel}
    >
      <Form
        onFinish={AddAddress}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={addressForm}
      >
        <Form.Item
          label="Thành Phố"
          name="city"
          style={{ width: "600px" }}
          rules={[{ required: true, message: "Vui lòng nhập thành phố" }]}
        >
          <Input style={{ width: "300px", marginLeft: "30px" }} />
        </Form.Item>
        <Form.Item
          label="Quận/Huyện"
          name="district"
          style={{ width: "600px" }}
          rules={[{ required: true, message: "Vui lòng nhập quận huyện" }]}
        >
          <Input style={{ width: "300px", marginLeft: "30px" }} />
        </Form.Item>
        <Form.Item
          label="Phường/xã"
          name="ward"
          style={{ width: "600px" }}
          rules={[{ required: true, message: "Vui lòng nhập phường xã" }]}
        >
          <Input style={{ width: "300px", marginLeft: "30px" }} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ đầy đủ"
          name="fullAddress"
          style={{ width: "600px" }}
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ đầy đủ" }]}
        >
          <Input style={{ width: "300px", marginLeft: "30px" }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <button type="primary" htmlType="submit">
            Thêm địa chỉ
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAddress;
