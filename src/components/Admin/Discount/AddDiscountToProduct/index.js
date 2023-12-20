import React, { useEffect, useState } from "react";
import { discountService } from "../../../../service/admin";
import { Switch, notification, Pagination } from "antd";
import moment from "moment";
import AddDiscountModal from "../AddDiscount/AddDiscountModal";
import "../../admin-product.css";

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await discountService.getDiscount({});
        const discount = response.data;
        setTotalCustomers(discount.length);
        const startIndex = (currentPage - 1) * pageSize;
        const slicedCustomers = discount.slice(
          startIndex,
          startIndex + pageSize
        );
        setDiscounts(slicedCustomers);
        // setDiscounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
  };

  const handleSwitchChange = async (discountId, isChecked) => {
    try {
      await discountService.changeStatus(discountId, isChecked ? 1 : 0);
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
    try {
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
      <h1 style={{ fontWeight: "bolder", marginTop: "20px" }}>
        Quản lý khuyến mại
      </h1>
      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
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
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
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
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCustomers}
          onChange={handleChangePage}
        />
      </div>
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
