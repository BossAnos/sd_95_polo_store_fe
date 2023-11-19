import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Dropdown, Space, Typography } from "antd";
import { adminAuthService } from "../../service/admin";
import { toastService } from "../../service/common";

const { Text } = Typography;
const { Header } = Layout;
const HeaderAdmin = ({}) => {
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useState(() => {
    return adminAuthService.getAuthInfo();
  });
  const [openKeys, setOpenKeys] = useState([]);

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
    <Header style={{ background: "#fff" }}>
      <div className="main_header" style={{ width: "100%" }}>
        <div className="logo" style={{ width: "200px" }}>
          <Link to="/admin">
            <img
              style={{
                width: "1000px",
                height: "auto",
                marginLeft: "-40px",
              }}
              src="https://firebasestorage.googleapis.com/v0/b/sd-95-polostore.appspot.com/o/PoloStore.png?alt=media&token=030f29fd-d1b6-4146-a922-be92e0ec5573"
              alt="PoloStore"
            />
          </Link>
        </div>
        <div>
          <div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 2,
                    label: <Text>My Profile</Text>,
                  },
                  {
                    key: 2,
                    label: <Text onClick={() => logoutHandle()}>Logout</Text>,
                  },
                ],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div>
                    <div className="font-bold">{authInfo.nameAdmin}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src="https://vevui.net/wp-content/uploads/2019/07/MONA-LISA-1.jpg"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAdmin;
