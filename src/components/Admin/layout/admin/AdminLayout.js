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
import { adminAuthService } from "../../services/admin";
import { toastService } from "../../services/common";

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

const { Text } = Typography;

const menus = [
  {
    name: "Brand",
    path: "/admin/",
    childrens: [
      {
        path: "brands",
        name: "Brand List",
      },
      {
        path: "categories",
        name: "Category List",
      },
      {
        path: "colors",
        name: "Color List",
      },
      {
        path: "sizes",
        name: "Size List",
      },
      {
        path: "materials",
        name: "Material List",
      },
      {
        path: "products",
        name: "Product List",
      },
      {
        path: "discounts",
        name: "Discount List",
      },
    ],
  },
  {
    name: "Orders",
    path: "/admin/",
    childrens: [
      {
        path: "orders",
        name: "Orders List",
      },
      {
        path: "orders/add",
        name: "Add Order",
      },
    ],
  },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useState(() => {
    return adminAuthService.getAuthInfo();
  });

  useEffect(() => {
    const storedAuthInfo = localStorage.getItem("authInfo");

    if (storedAuthInfo) {
      setAuthInfo(JSON.parse(storedAuthInfo));
    }
  }, []);

  const logoutHandle = () => {
    adminAuthService.logout();
    toastService.success("Logout successfully");
    navigate("/admin/login");
  };

  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
        }}
      >
        <div className="main_header" style={{ width: "100%" }}>
          <div className="logo" style={{ width: "40px" }}>
            <Link to={"/admin"}>
              <img
                style={{ width: "100%" }}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
            </Link>
          </div>
          <div>
            <div>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 1,
                      label: <Text onClick={() => logoutHandle()}>Logout</Text>,
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Hello, {authInfo.name}
                    {/* <DownOutlined /> */}
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
      <Divider style={{ margin: 0 }}></Divider>
      <Layout>
        <Sider
          theme="light"
          style={{
            borderRight: "1px solid rgba(5, 5, 5, 0.06)",
            width: "500px",
          }}
        >
          <div style={{ padding: "1rem", boxSizing: "border-box" }}>
            {menus.map((menu, index) => {
              return (
                <div key={index}>
                  <Text type="secondary">{menu.name}</Text>
                  <Divider style={{ marginBottom: "5px" }}></Divider>
                  {menu.childrens.map((child, index) => {
                    const path = (menu.path || "/") + child.path;
                    return (
                      <Menu
                        key={index}
                        selectedKeys={[]}
                        items={[
                          {
                            label: (
                              <>
                                <Link
                                  className={
                                    path === location.pathname
                                      ? "menu_item_active"
                                      : ""
                                  }
                                  to={path}
                                >
                                  {child.name}
                                </Link>
                              </>
                            ),
                          },
                        ]}
                      ></Menu>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Sider>
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
      </Layout>
    </Layout>
  );
};

export { AdminLayout };
