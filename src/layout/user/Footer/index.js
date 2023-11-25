// import React from 'react';
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-light">
      <section className="section-b-space light-layout main-footer">
        <div className="container">
          <div className="row footer-theme partition-f">
            <div className="col-lg-4 col-md-6">
              <div className="footer-contant">
                <div className="footer-logo">
                  <Link to={"/"}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sd-95-polostore.appspot.com/o/PoloStore.png?alt=media&token=030f29fd-d1b6-4146-a922-be92e0ec5573"
                      className="img-fluid blur-up lazyloaded"
                      alt=""
                      width={"150px"}
                    />
                  </Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
                <div className="footer-social">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-google-plus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-solid fa-wifi" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col offset-xl-1">
              <div
                className="sub-title"
                style={{ marginTop: "-70px", marginLeft: "90px" }}
              >
                <div className="footer-title">
                  <h4>LIÊN HỆ</h4>
                </div>
                <div className="footer-contant" style={{ marginTop: "-20px" }}>
                  <ul>
                    <li>
                      <a href="#">Giới thiệu</a>
                    </li>
                    <li>
                      <a href="#">Tin tức</a>
                    </li>
                    <li>
                      <a href="#">Trợ giúp</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="sub-title" style={{ marginTop: "-70px" }}>
                <div className="footer-title">
                  <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                </div>
                <div className="footer-contant" style={{ marginTop: "-20px" }}>
                  <ul>
                    <li>
                      <a href="#">Đăng ký tài khoản</a>
                    </li>
                    <li>
                      <a href="#">Chính sách giao hàng</a>
                    </li>
                    <li>
                      <a href="#">Chính sách đổi trả</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="sub-title">
                <div className="footer-title" style={{ marginTop: "-70px" }}>
                  <h4>Thông tin cửa hàng</h4>
                </div>
                <div className="footer-contant">
                  <ul className="contact-list" style={{ marginTop: "-20px" }}>
                    <li>
                      <i className="fa fa-map-marker"></i>
                      PoloStore, VietNam
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>Liên hệ: 085.657.2786
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>Email Us: PoloStore
                    </li>
                    <li>
                      <i className="fa fa-fax"></i>Fax: 99999
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="sub-footer">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="footer-end">
                            <p><i className="fa fa-copyright" aria-hidden="true"></i> 2023-24 themeforest powered by
                                pixelstrap</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="payment-card-bottom">
                            <ul>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/visa.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/mastercard.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/paypal.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/american-express.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/discover.png" alt=""/></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </footer>
  );
};

export { Footer };
