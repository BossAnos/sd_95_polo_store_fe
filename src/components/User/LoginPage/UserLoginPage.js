import { Form, Input } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { userAuthService } from "../../../service/user";
import { toastService } from "../../../service/common";
import { useNavigateOrRedirectUrl } from "../../../hook";
import { useEffect } from "react";
import "./login.css"

const UserLoginPage = () => {
  const [setPage] = useNavigateOrRedirectUrl();

  useEffect(() => {
    if (userAuthService.isLogin()) {
      setPage("/");
    }
  });

  const loginHandle = async (form) => {
    try {
      const res = await userAuthService.login(form);
      userAuthService.saveAuthInfo(res.data);
      toastService.success("Đăng nhập thành công");
      setPage("/");
    } catch (error) {
      toastService.error("Sai Email hoặc mật khẩu");
    }
  };

  return (
    <div className="login-page">
      <div className="breadcrumb-section">
        <div className="container">

        </div>
      </div>
      <div className="container login-form mt-3">
        <div className="page-info"></div>
        <div className="row">
          <div className="cart-container">

      
          <div className="col-6">
          <p className="text-login">LOGIN</p> <br></br>
            <div className="container-text">
            
            <p style={{width:"400px"}}>Bạn chưa có tài khoản?</p>
            <div style={{height:"20px"}}></div>
            <a  href="#" >Tạo tài khoản</a>
            </div>
          
           
            <div className="theme-card">
              <Form style={{marginTop:"20px"}}
                className="theme-form"
                layout="vertical"
                onFinish={loginHandle}
              >
                <Form.Item
                  name={"email"}
                  label="Email"
                  rules={[{ required: true, message: "Email không chính sác" }]}
                >
                  <Input placeholder="email/username" size="large" />
                </Form.Item>
                <Form.Item 
                  name={"password"}
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Mật khẩu không chính xác" },
                  ]}
                >
                  <Input placeholder="password" type="password" size="large" />
                </Form.Item>
                <a  href="#" style={{backgroundColor:"white"}}>Quên mật khẩu ?</a> <br></br>
                <button type="submit" className="btn-login">
                  Đăng nhập
                </button>
              </Form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserLoginPage };
