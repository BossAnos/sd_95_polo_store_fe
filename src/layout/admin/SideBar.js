import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import * as Icons from "@heroicons/react/24/solid";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-4 w-4`;
const { Sider } = Layout;
const { Text } = Typography;

const menus = [
  {
    childrens: [
      {
        path: "admin",
        icon: <Icons.HomeIcon className={iconClasses} />,
        name: "Tổng quát",
      },
      {
        path: "categories",
        icon: <Icons.TruckIcon className={iconClasses} />,
        name: "Đơn hàng",
      },
      {
        path: "colors",
        icon: <Icons.ShoppingCartIcon className={iconClasses} />,
        name: "Tạo Hóa Đơn",
      },
      {
        path: "admin/customer",
        icon: <Icons.UserGroupIcon className={iconClasses} />,
        name: "Khách Hàng",
      },
      {
        path: "",
        icon: <Icons.AdjustmentsHorizontalIcon className={iconClasses} />,
        name: "Phần Quyền",
        submenu: [
          {
            path: "/login",
            icon: <Icons.UserIcon className={submenuIconClasses} />,
            name: "Nhân Viên",
          },
          {
            path: "/login",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Vai Trò",
          },
        ],
      },
      {
        path: "",
        icon: <Icons.FolderIcon className={iconClasses} />,
        name: "Sản Phẩm",
        submenu: [
          {
            path: "/login",
            icon: <Icons.UserIcon className={submenuIconClasses} />,
            name: "Sản Phẩm",
          },
          {
            path: "/login",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Size",
          },
          {
            path: "/login",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Màu sắc",
          },
          {
            path: "/login",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Chất Liệu",
          },
          {
            path: "/login",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Thương Hiệu",
          },
          {
            path: "/login",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Loại Áo",
          },
        ],
      },
      {
        path: "discounts",
        icon: <Icons.TagIcon className={submenuIconClasses} />,
        name: "Khuyến Mại",
        submenu: [
          {
            path: "/login",
            icon: <Icons.UserIcon className={submenuIconClasses} />,
            name: "Tạo khuyến mại",
          },
          {
            path: "/login",
            icon: <Icons.TagIcon className={submenuIconClasses} />,
            name: "Danh sách khuyến mại",
          },
        ],
      },
    ],
  },
];

const SiderBar = ({}) => {
  const [openKeys, setOpenKeys] = useState([]);

  const handleMenuClick = (key) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter((k) => k !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };
  return (
    <Sider theme="light" style={{ width: "350px" }}>
      <div style={{ padding: "0rem", boxSizing: "border-box" }}>
        {menus.map((menu, index) => {
          return (
            <div key={index}>
              <Text type="secondary">{menu.name}</Text>

              {menu.childrens.map((child, index) => {
                const path = (menu.path || "/") + child.path;

                // Kiểm tra xem có submenu hay không
                if (child.submenu && child.submenu.length > 0) {
                  const isOpen = openKeys.includes(child.name);
                  const menuItems = child.submenu.map((subItem, subIndex) => (
                    <Menu.Item
                      key={subIndex}
                      style={{
                        paddingLeft: "40px",
                        borderLeft: "3px solid rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0px",
                      }}
                    >
                      <Link to={subItem.path}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "2px",
                          }}
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </div>
                      </Link>
                    </Menu.Item>
                  ));

                  const menuDropdown = <Menu>{menuItems}</Menu>;

                  return (
                    <div key={index}>
                      <div
                        className={`menu_item ${
                          child.submenu && child.submenu.length > 0
                            ? "submenu-item"
                            : ""
                        }`}
                        onClick={() => handleMenuClick(child.name)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "45px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {child.icon}
                          <span
                            className="menu_item_name"
                            style={{
                              marginLeft: "8px",
                              marginRight: "30px",
                            }}
                          >
                            {child.name}
                          </span>
                          <div
                            style={{
                              display: "flex",
                              width: "16px",
                              justifyContent: "center",
                            }}
                          >
                            <CaretDownOutlined
                              rotate={isOpen ? 0 : 180}
                              style={{
                                fontSize: "10px",
                                marginLeft: "30px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {isOpen && menuDropdown}
                    </div>
                  );
                } else {
                  return (
                    <Menu
                      key={index}
                      selectedKeys={[]}
                      items={[
                        {
                          label: (
                            <Link
                              className={({ isActive }) =>
                                `${
                                  isActive
                                    ? "font-semibold  bg-base-200 "
                                    : "font-normal"
                                }`
                              }
                              to={path}
                            >
                              <div
                                className="menu_item"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {child.icon}
                                <span
                                  className="menu_item_name"
                                  style={{
                                    marginLeft: "8px",
                                  }} /* adjust the spacing between the icon and name */
                                >
                                  {child.name}
                                </span>
                              </div>
                            </Link>
                          ),
                        },
                      ]}
                    ></Menu>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </Sider>
  );
};

export default SiderBar;
