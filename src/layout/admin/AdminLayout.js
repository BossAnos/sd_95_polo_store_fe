import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
  CaretDownFilled,
  UpOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
  theme,
} from "antd";
import { AdminBreadCrumb } from "./AdminBreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import { toastService } from "../../service/common";
import HeaderAdmin from "./Header";
import SiderBar from "./SideBar";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Layout>
      <HeaderAdmin />
      <Divider style={{ margin: 0, border: "none" }}></Divider>
      <Layout>
        <SiderBar />
        <Content
          style={{
            background: "#EEEEEE",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
            }}
          >
            <div className="mb-3">
              <AdminBreadCrumb />
            </div>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export { AdminLayout };
