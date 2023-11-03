import React, { useState } from "react";
import Sidebar from "./sidebar";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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

const { Header, Content, Footer, Sider } = Layout;

const LayoutDefault = ({ children }) => {
  return (
    <div className="flex overflow-auto">
      <Sidebar />
      <div className={`w-full pl-20 "md:pl-64" : ""}`}>
        <div style={{ height: "calc(100vh - 56px)" }}>
          {" "}
          <Content style={{ background: "#fff", minHeight: "100vh" }}>
            <div
              style={{
                padding: "2rem",
              }}
            >
              <div className="mb-3">
                <AdminBreadCrumb />
              </div>
              {children}
            </div>
          </Content>
        </div>
        <footer className="fixed h-14 shadow-md bottom-0 w-full flex items-center px-4 text-gray-600">
          GEM © 2023 All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export { LayoutDefault };
