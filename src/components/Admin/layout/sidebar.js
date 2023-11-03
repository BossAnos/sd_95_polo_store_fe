import { NavLink } from "react-router-dom";
import "./layout.scss";
import iconDataset from "../../../assets/icon/gallery.svg";
import iconHome from "../../../assets/icon/home.svg";
import iconLogout from "../../../assets/icon/logout.svg";
import iconAccount from "../../../assets/icon/user.svg";
import avatar from "../../../assets/image/avatar.svg";

const Sidebar = () => {
  const NavList = [
    {
      to: "/",
      icon: iconHome,
      title: "Dashboard",
    },
    {
      to: "/account",
      icon: iconAccount,
      title: "Account Management",
    },
    {
      to: "/products",
      icon: iconDataset,
      title: "Product Management",
    },
  ];

  const CLASS_NAME = {
    TITLE: "invisible md:visible truncate",
    NAV_ITEM: "flex space-x-4 py-4 px-8",
    NAV_LINK: "w-full hover:bg-gray-700 duration-300",
    LOGO: "h-6 w-6",
  };

  const NavItem = NavList.map((item, index) => (
    <NavLink
      key={index}
      to={item.to}
      className={({ isActive }) =>
        (isActive ? "bg-main" : "") + " w-full hover:bg-gray-700 duration-300"
      }
    >
      <div className={CLASS_NAME.NAV_ITEM}>
        <img src={item.icon} className={CLASS_NAME.LOGO} alt="" />
        <p className={CLASS_NAME.TITLE}>{item.title}</p>
      </div>
    </NavLink>
  ));

  return (
    <>
      <div className="w-22 md:w-75 fixed bg-black h-screen text-white flex flex-col justify-between font-semibold">
        <div className="flex flex-col justify-start items-start py-6">
          {NavItem}
        </div>
        <div>
          {/* <LogOutModal /> */}
          <div className="p-5">
            <button
              //   onClick={handleToggleLogOutModal}
              className="flex justify-center text-white border w-full border-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full py-2.5 text-center px-2"
            >
              <img src={iconLogout} alt="logout icon" />
              <span className="invisible md:visible truncate pl-2">
                Log Out
              </span>
            </button>
          </div>
          <div className="bg-gray-700 h-16 py-2 px-6 flex items-center space-x-4">
            <img src={avatar} className="h-12 w-12" alt="" />
            <p className={CLASS_NAME.TITLE}>Duc Anh</p>
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
