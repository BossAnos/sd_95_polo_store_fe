// AddDiscountModal.js
import React, { useRef, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { discountService } from "../../../../service/admin";
import moment from "moment";

const AddDiscountModal = ({ visible, onOk, onCancel }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const handleOk = async () => {
    formRef.current
      .validateFields()
      .then(async (values) => {
        const { startDate, endDate, discount } = values;

        // Format the dates to match the expected format
        const formattedStartDate = moment(startDate).format(
          "YYYY-MM-DDTHH:mm:ss"
        );
        const formattedEndDate = moment(endDate).format("YYYY-MM-DDTHH:mm:ss");

        // Chuyển đổi chuỗi ngày sang đối tượng Moment để so sánh
        const startMoment = moment(formattedStartDate, "YYYY-MM-DDTHH:mm:ss");
        const endMoment = moment(formattedEndDate, "YYYY-MM-DDTHH:mm:ss");

        if (startMoment.isAfter(endMoment)) {
          message.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
          return;
        }
        const formattedDiscount = parseFloat(discount) / 100;

        // Gọi hàm onOk của parent và truyền giá trị form
        try {
          const response = await discountService.createDiscount({
            ...values,
            startDate: startMoment.format("YYYY-MM-DDTHH:mm:ss"),
            endDate: endMoment.format("YYYY-MM-DDTHH:mm:ss"),
            discount: formattedDiscount,
          });
          onOk(response.data);
          createDiscountFinishHandle(response.data);
          formRef.current.resetFields();
        } catch (error) {
          message.error("Error creating discount");
        }
      })
      .catch((errorInfo) => {
        message.error("Vui lòng điền đầy đủ thông tin");
      });
  };
  const handleCancel = () => {
    formRef.current.resetFields();
    onCancel();
  };

  const createDiscountFinishHandle = async (newDiscount) => {
    // Call the parent component's handler to update the material options
    visible.onCreateMaterialFinish(newDiscount);

    // Close the modal or perform any other necessary actions
    visible.onMaterialFinish();
  };

  return (
    <Modal
      title="Thêm khuyến mại"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
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
