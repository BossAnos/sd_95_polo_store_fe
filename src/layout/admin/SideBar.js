import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import * as Icons from "@heroicons/react/24/solid";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-4 w-4`;
const { Sider } = Layout;
const { SubMenu } = Menu;

const menus = [
  {
    childrens: [
      {
        path: "/admin",
        icon: <Icons.HomeIcon className={iconClasses} />,
        name: "Tổng quát",
      },
      {
        path: "/admin/orders",
        icon: <Icons.TruckIcon className={iconClasses} />,
        name: "Đơn hàng",
      },
      {
        path: "/admin/orders/create",
        icon: <Icons.ShoppingCartIcon className={iconClasses} />,
        name: "Tạo Hóa Đơn",
      },
      {
        path: "/admin/customer",
        icon: <Icons.UserGroupIcon className={iconClasses} />,
        name: "Khách Hàng",
      },
      {
        icon: <Icons.AdjustmentsHorizontalIcon className={iconClasses} />,
        name: "Phần Quyền",
        submenu: [
          {
            path: "/admin/manger",
            icon: <Icons.UserIcon className={submenuIconClasses} />,
            name: "Nhân Viên",
          },
          {
            path: "/admin/role",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Vai Trò",
          },
        ],
      },
      {
        icon: <Icons.FolderIcon className={iconClasses} />,
        name: "Sản Phẩm",
        submenu: [
          {
            path: "/admin/product",
            icon: <Icons.UserIcon className={submenuIconClasses} />,
            name: "Sản Phẩm",
          },
          {
            path: "/admin/size",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Size",
          },
          {
            path: "/admin/color",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Màu sắc",
          },
          {
            path: "/admin/material",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Chất Liệu",
          },
          {
            path: "/admin/brand",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Thương Hiệu",
          },
          {
            path: "/admin/category",
            icon: <Icons.FlagIcon className={submenuIconClasses} />,
            name: "Loại Áo",
          },
        ],
      },
      {
        icon: <Icons.TagIcon className={submenuIconClasses} />,
        name: "Khuyến Mại",
        submenu: [
          {
            path: "/admin/discount/addDiscountToProduct",
            icon: <Icons.UserIcon className={submenuIconClasses} />,
            name: "Áp dụng khuyến mại",
          },
          {
            path: "/admin/Discount",
            icon: <Icons.TagIcon className={submenuIconClasses} />,
            name: "Danh sách khuyến mại",
          },
        ],
      },
    ],
  },
];

const MenuContext = createContext();

const SiderBar = () => {
  const location = useLocation();
  const [selectedSubMenu, setSelectedSubMenu] = useState([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const parentPaths = getParentPaths(currentPath);
    setSelectedSubMenu(parentPaths);
  }, [location]);

  const getParentPaths = (path) => {
    const parentPaths = [];
    menus[0].childrens.forEach((menu) => {
      if (menu.submenu) {
        menu.submenu.forEach((submenu) => {
          if (path.startsWith(submenu.path)) {
            parentPaths.push(submenu.path);
          }
        });
      }
    });
    return parentPaths;
  };

  const toggleSubMenu = (path) => {
    setSelectedSubMenu((prev) => {
      if (prev.includes(path)) {
        return prev.filter((p) => p !== path);
      } else {
        return [...prev, path];
      }
    });
  };

  const isSubMenuOpen = (path) => {
    return selectedSubMenu.includes(path);
  };

  return (
    <MenuContext.Provider
      value={{
        toggleSubMenu,
        isSubMenuOpen,
      }}
    >
      <Sider theme="light">
        <Menu theme="light" mode="inline">
          {menus[0].childrens.map((menu) => {
            if (menu.submenu) {
              return (
                <SubMenu
                  key={menu.name}
                  icon={menu.icon}
                  title={menu.name}
                  onTitleClick={() => toggleSubMenu(menu.name)}
                  open={isSubMenuOpen(menu.name)}
                >
                  {menu.submenu.map((submenu) => (
                    <Menu.Item key={submenu.path}>
                      <Link to={submenu.path} className="flex items-center">
                        {submenu.icon}
                        <span className="ml-2">{submenu.name}</span>
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={menu.path} icon={menu.icon}>
                  <Link to={menu.path}>{menu.name}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
    </MenuContext.Provider>
  );
};

const MenuItem = ({ path, icon, name }) => {
  const { toggleSubMenu, isSubMenuOpen } = useContext(MenuContext);

  return (
    <Menu.Item
      key={path}
      icon={icon}
      onClick={() => toggleSubMenu(name)}
      theme="light"
    >
      <Link to={path}>{name}</Link>
    </Menu.Item>
  );
};

export default SiderBar;
