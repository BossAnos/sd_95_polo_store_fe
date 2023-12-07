import React from "react";
import { Row, Col } from "antd";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import "./index.css";

const AdminDashBoard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng đơn hàng</h2>
            <div className="dashboard-value">100</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng khách hàng</h2>
            <div className="dashboard-value">50</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng doanh thu</h2>
            <div className="dashboard-value">100.000.000đ</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="dashboard-item">
            <h2>Tổng sản phẩm</h2>
            <div className="dashboard-value">200</div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>Biểu đồ doanh thu</h2>
          <RevenueChart />
        </Col>
        <Col span={12}>
          <h2>Biểu đồ trạng thái đơn hàng</h2>
          <OrderStatusChart />
        </Col>
      </Row>
    </div>
  );
};

export { AdminDashBoard };
