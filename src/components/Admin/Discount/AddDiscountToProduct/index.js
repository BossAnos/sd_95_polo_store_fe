// DiscountManagement.js
import React, { useEffect, useState } from "react";
import { discountService } from "../../../../service/admin";
import { Switch, notification } from "antd";
import moment from "moment";
import AddDiscountModal from "../AddDiscount/AddDiscountModal";
import "../../admin-product.css"

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await discountService.getDiscount({});
        setDiscounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
  };

  const handleSwitchChange = async (discountId, isChecked) => {
    try {
      // Gọi API hoặc thực hiện các hành động cần thiết để cập nhật status trên server
      // await discountService.updateDiscountStatus(discountId, isChecked ? 1 : 0);

      // Cập nhật trạng thái ngay trong local state (giả sử API thành công)
      const updatedDiscounts = discounts.map((discount) =>
        discount.id === discountId
          ? { ...discount, status: isChecked ? 1 : 0 }
          : discount
      );
      setDiscounts(updatedDiscounts);
      notification.success({
        message: "Success",
        description: "Trạng thái khuyến mại đã được cập nhật",
      });
    } catch (error) {
      console.error("Error updating discount status:", error);
    }
  };

  const handleAddDiscount = async (formData) => {
    // Gọi API hoặc thực hiện các hành động cần thiết để thêm khuyến mại
    // Sau đó cập nhật local state và đóng modal
    try {
      // const result = await discountService.addDiscount(formData);
      setDiscounts([...discounts, formData]);
      setIsModalVisible(false);
      notification.success({
        message: "Success",
        description: "Khuyến mại đã được thêm mới",
      });
    } catch (error) {
      console.error("Error adding discount:", error);
    }
  };

  return (
    <div>
      <button type="primary" onClick={() => setIsModalVisible(true)}>
        Thêm khuyến mại
      </button>
      <h1 style={{fontWeight:"bolder",marginTop:"20px"}}>Quản lý khuyến mại</h1>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khuyến mại</th>
            <th>Giảm giá</th>
            <th>Mô tả</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount, index) => {
            const isChecked = discount.status === 1;

            return (
              discount.id !== 1 && (
                <tr key={discount.id}>
                  <td>{index + 1}</td>
                  <td>{discount.name}</td>
                  <td>{(discount.discount * 100).toFixed(2)}%</td>
                  <td>{discount.description}</td>
                  <td>{formatDateTime(discount.startDate)}</td>
                  <td>{formatDateTime(discount.endDate)}</td>
                  <td>
                    <Switch
                      checked={isChecked}
                      onChange={(checked) =>
                        handleSwitchChange(discount.id, checked)
                      }
                      style={{
                        backgroundColor: isChecked ? "green" : "red", // Màu nền
                        borderColor: isChecked ? "green" : "red", // Màu viền
                        color: isChecked ? "white" : "black",
                        width: "30px",
                      }}
                    />
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <AddDiscountModal
    
        visible={isModalVisible}
        onOk={handleAddDiscount}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </div>
  );
};

export { DiscountManagement };
