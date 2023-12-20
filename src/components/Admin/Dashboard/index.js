import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import { orderService } from "../../../service/admin";
import "./index.css";

const AdminDashBoard = () => {
  const [orderData, setOrderData] = useState([]);

  const [timeRange, setTimeRange] = useState("all"); // Default time range is "all"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let response;

        // Adjust the API call based on the selected time range
        if (timeRange === "all") {
          response = await orderService.getOrders();
        } else {
          // Adjust the API call to get orders within the specified time range
          // You need to update the API endpoint or parameters based on your backend logic
          response = await orderService.getOrdersByTimeRange(timeRange);
        }

        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, [timeRange]);

  // Calculate total number of completed orders (status 5)
  const totalCompletedOrders = orderData.filter(
    (order) => order.status === 5
  ).length;

  // Calculate total number of orders in progress (status 4)
  const totalOrdersInProgress = orderData.filter(
    (order) => order.status === 4
  ).length;

  const totalOrders = orderData.length;
  const totalRevenue = orderData.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  return (
    <div>
      <div>
        <button onClick={() => setTimeRange("all")}>Tất cả</button>
        <button onClick={() => setTimeRange("15days")}>15 ngày</button>
        <button onClick={() => setTimeRange("30days")}>30 ngày</button>
      </div>
      <br></br>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng đơn hàng</h2>
            <div className="dashboard-value">{totalOrders}</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng đơn hoàn thành</h2>
            <div className="dashboard-value">{totalCompletedOrders}</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng doanh thu</h2>
            <div className="dashboard-value">
              {totalRevenue.toLocaleString()}đ
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng đang giao</h2>
            <div className="dashboard-value">{totalOrdersInProgress}</div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>Biểu đồ doanh thu</h2>
          <RevenueChart orderData={orderData} />
        </Col>
        <Col span={12}>
          <h2>Biểu đồ trạng thái đơn hàng</h2>
          <OrderStatusChart orderData={orderData} />
        </Col>
      </Row>
    </div>
  );
};

export { AdminDashBoard };
