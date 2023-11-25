import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import { userAuthService } from "../../../service/user";
import { useNavigateLoginPage, useNavigateOrRedirectUrl } from "../../../hook";
import { useUserStore } from "../../store";
import { patchProductForm } from "../../store/action";
import { Form, Input } from "antd";

// http://themes.pixelstrap.com/multikart/front-end/furniture-2.html#
const Header = () => {
  const [useInfo, setUserInfo] = useState();
  const [navigateLogin] = useNavigateLoginPage();

  const [state, dispatch] = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (userAuthService.isLogin()) {
      const userInfo = userAuthService.getAuthInfo();
      setUserInfo(userInfo);
    }
  }, []);

  const logoutHandle = () => {
    userAuthService.logout();
    navigateLogin();
  };

  const searchProductHandle = (form) => {
    if (!form.name) {
      return;
    }
    dispatch(
      patchProductForm({
        name: form.name,
      })
    );
    navigate("/products/search/", {
      state: {
        name: form.name,
      },
      search: "?name=" + form.name,
    });
  };

  return (
    <header>
      <div className="main_header">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="brand-logo">
                    <Link to={"/"}>
                      <img
                        style={{ marginTop: "-22px" }}
                        src="https://firebasestorage.googleapis.com/v0/b/sd-95-polostore.appspot.com/o/PoloStore.png?alt=media&token=030f29fd-d1b6-4146-a922-be92e0ec5573"
                        className="img-fluid blur-up lazyloaded"
                        alt=""
                        width={"180px"}
                      />
                    </Link>
                  </div>
                </div>
                <p>TÌM KIẾM</p>
                <Form
                  className="form_search border-radius-0"
                  onFinish={searchProductHandle}
                >
                  <Form.Item name={"name"} className="search-input">
                    <Input
                      id="query search-autocomplete"
                      type="search"
                      placeholder="Search products"
                      className="nav-search-field"
                    />
                  </Form.Item>
                  <button
                    type="submit"
                    name="nav-submit-button"
                    className="btn-search"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </Form>
                <div className="menu-right pull-right">
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-cart">
                          <Link to={"/carts"}>
                            <img
                              className="me-3"
                              src="http://themes.pixelstrap.com/multikart/assets/images/icon/cart.png"
                            />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="">
                  <ul className="header-dropdown">
                    <li className="onhover-dropdown mobile-account">
                      {userAuthService.isLogin() && (
                        <div className="userInfo">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">{useInfo?.name}</div>
                            </div>
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={useInfo?.avatar}
                                  alt="Avatar"
                                  className="rounded-full"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <ul className="onhover-show-div">
                            <li>
                              <Link to={"/account"}>My Account</Link>
                            </li>
                            <li>
                              <Link to={"/orders"}>My Orders</Link>
                            </li>
                            <hr></hr>
                            <li onClick={logoutHandle}>
                              <a>Logout</a>
                            </li>
                          </ul>
                        </div>
                      )}
                      {!userAuthService.isLogin() && (
                        <div>
                          <a onClick={() => navigateLogin()}>Login</a>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header_bottom bottom-part bottom-light">
        <div className="container">
          <div className="main-nav-center">
            <nav id="main-nav">
              <ul id="main-menu">
                <Link to={"/"}>
                  <li className="text-dark">Trang chủ</li>
                </Link>
                <li>Giảm giá</li>
                <li>Bộ sưu tập</li>
                <li>Sản phẩm</li>
                <li>Chính sách</li>
                <li>Giới thiệu</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
