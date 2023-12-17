// AddDiscountModal.js
import React, { useRef } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import moment from "moment";

const AddDiscountModal = ({ visible, onOk, onCancel }) => {
  const formRef = useRef();

  const handleOk = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        const { startDate, endDate } = values;

        // Chuyển đổi chuỗi ngày sang đối tượng Moment để so sánh
        const startMoment = moment(startDate, "YYYY-MM-DD");
        const endMoment = moment(endDate, "YYYY-MM-DD");

        if (startMoment.isAfter(endMoment)) {
          message.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
          return;
        }

        // Gọi hàm onOk của parent và truyền giá trị form
        onOk(values);
        formRef.current.resetFields();
      })
      .catch((errorInfo) => {
        message.error("Vui lòng điền đầy đủ thông tin");
      });
  };

  const handleCancel = () => {
    formRef.current.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Thêm khuyến mại"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form ref={formRef}>
        <Form.Item
          label="Tên khuyến mại"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên khuyến mại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giảm giá"
          name="discount"
          rules={[{ required: true, message: "Vui lòng nhập giảm giá!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Bắt đầu"
          name="startDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Kết thúc"
          name="endDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDiscountModal;
