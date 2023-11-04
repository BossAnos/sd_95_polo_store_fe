import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./layout.scss";
import iconDataset from "../../../assets/icon/gallery.svg";
import iconHome from "../../../assets/icon/home.svg";
import iconLogout from "../../../assets/icon/logout.svg";
import iconAccount from "../../../assets/icon/user.svg";
import avatar from "../../../assets/image/avatar.svg";
import { useState } from "react";
import Tooltip from "rc-tooltip";
import logo from "../../../assets/image/logo.svg";

const Sidebar = () => {
  const { t } = useTranslation();
  const NavListDefault = [
    {
      to: "/admin/dashboard",
      icon: iconHome,
      title: "Dashboard",
    },
    {
      to: "/admin/account",
      icon: iconAccount,
      title: "Account Management",
    },
    {
      to: "/admin/color",
      icon: iconDataset,
      title: "Product Management",
      children: [
        {
          to: "/admin/color",
          title: "Color",
        }
      ],
      showDropDown : false,
    },
    {
      to: "/admin/customer",
      title: "Customer Management",
    }
  ];

  const [NavList] = useState(NavListDefault);

  const CLASS_NAME = {
    TITLE: "invisible md:visible truncate",
    NAV_ITEM: "flex space-x-4 py-4 px-8",
    NAV_LINK: "w-full hover:bg-gray-700 duration-300",
    LOGO: "h-6 w-6",
  };

  // const CLASS_NAME = {
  //   TITLE: "truncate",
  //   NAV_ITEM: "flex space-x-4 py-4 px-8",
  //   NAV_LINK: "w-full hover:bg-gray-700 duration-300",
  //   LOGO: "h-6 w-6",
  // };

  const onClickItemMenu = (item) => {
    item.showDropDown = !item.showDropDown
  }

  // const NavItem = NavList.map((item, index) => (
  //   <NavLink
  //     key={index}
  //     to={item.to}
  //     className={({ isActive }) =>
  //       (isActive ? "bg-main" : "") + " w-full hover:bg-gray-700 duration-300"
  //     }
  //   >
  //     <div className={CLASS_NAME.NAV_ITEM}>
  //       <img src={item.icon} className={CLASS_NAME.LOGO} alt="" />
  //       <p className={CLASS_NAME.TITLE}>{item.title}</p>
  //     </div>
  //   </NavLink>
  // ));

  const genItemMenu = (item, index, isChildren = false, showDropDown = true) => {
    return (
      <>
        <NavLink
          key={index}
          to={item.to}
          onClick={() => onClickItemMenu(item)}
          className={({ isActive }) =>
            (isActive ? "bg-main" : "") +
            "sideBarItemMenuDefault" +
            (isChildren ? " pl-10" : "") +
            (isChildren ? " max-h-0 overflow-hidden" + (showDropDown ? " max-h-280" : " "): "max-h-280" )
          }
        >
          <div className={CLASS_NAME.NAV_ITEM + "flex justify-between px-6"}>
            <div className="flex space-x-4">
              {item.icon && (
                <img src={item.icon} className={CLASS_NAME.LOGO} alt="" />
              )}
              <p className={CLASS_NAME.TITLE}>{item.title}</p>
            </div>
            {item.children && (
              item.showDropDown ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 15L12 9L5 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
              ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 15L5 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
              )
            )}
          </div>
        </NavLink>
        {
          item.children && (
            item.children.map((children, index) => (
              genItemMenu(children, index, true, item.showDropDown)
            ))
          )
        }
      </>
    )
  }

  const NavItem = NavList.map((item, index) => (
    genItemMenu(item, index)
  ))

  return (
    <>
      <div className="w-20 fixed bg-black h-screen text-white flex flex-col justify-between md:w-64">
        <div className="flex flex-col justify-start items-start duration-300 h-auto">
          {/* <div className="w-full pb-2 flex flex-col justify-center items-center">
            <img src={logo} className={CLASS_NAME.NAV_ITEM} alt="" />
          </div> */}
          {NavItem}
        </div>
        <div>
          <div className="bg-gray-700 h-14 py-2 px-6 flex justify-between">
            <div className="flex items-center space-x-4">
              <img src={avatar} className="h-10 w-10" alt="" />
              <p className={CLASS_NAME.TITLE}>Duc Anh</p>
            </div>
            <Tooltip placement="bottom" overlay={<span>{t("Log out")}</span>}>
              <img
                src={iconLogout}
                alt="logout icon"
                className="w-6 cursor-pointer"
                // onClick={handleToggleLogOutModal}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {/* <LogOutModal /> */}
    </>
  );
};

export default Sidebar;
