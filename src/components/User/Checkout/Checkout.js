import { Checkbox, Form, Input, Select, Radio, Button } from "antd";
import "./Checkout.css";
import { useEffect, useState } from "react";
import { userAuthService, cartService } from "../../../service/user";
import { toastService } from "../../../service/common";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../../common/LoadingPage";

const Checkout = () => {
  const [checkOutProducts, setCheckOutProducts] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userInfo = userAuthService.getAuthInfo();
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await cartService.getCheckoutByStatus();

        setCheckOutProducts(res.data.cartDetailResponses);
        console.log(res);

        const userInfo = userAuthService.getAuthInfo();
        form.setFieldValue("username", userInfo?.name || "");
        form.setFieldValue("phone", userInfo?.phone || "");

        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, []);

  const handleClick = (addressId) => {
    setSelectedAddress(addressId);
  };

  const addOrderSubmitHandle = async () => {
    const userInfo = userAuthService.getAuthInfo();
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }
    try {
      const formValue = form.getFieldsValue();
      const hoadonchitiet = checkOutProducts.map((cp) => {
        return {
          dongia: cp.giaban,
          machitietsanpham: cp.mactsp,
          soluong: cp.soluong,
        };
      });
      const selectedAddress = formValue.selectedAddress;
      const address = userInfo.address.find(
        (address) => address.id === selectedAddress
      );

      const request = {
        ...formValue,
        address,
        hoadonchitiet,
        tonggia: getSubTotalPrice(),
      };
      console.log(userInfo?.makhachhang);
      // const addOrderRes = await hoaDonKhachHang.addOrder(
      //   userInfo.makhachhang,
      //   request
      // );
      toastService.success("Checkout Successfully");
      navigate("/orders");
    } catch (error) {
      toastService.error(error.apiMessage);
    }
  };
  const getSubTotalPrice = () => {
    if (checkOutProducts?.length === 0) {
      return 0;
    }
    return checkOutProducts
      .filter((p) => p)
      .reduce((total, product) => {
        const price =
          product.priceCore === product.pricePromotion
            ? product.priceCore
            : product.pricePromotion;
        return total + price * product.quantity;
      }, 0);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="checkout-page">
      <div className="breadcrumb-section">
        <div className="container">
          <h2>THANH TOÁN</h2>
        </div>
      </div>
      <div className="section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Form layout="vertical" form={form}>
                <div>
                  <div className="d-flex custom-user-form">
                    <Form.Item
                      label="Tên người nhận"
                      name="username"
                      rules={[
                        { required: true, message: "Full name is required" },
                      ]}
                    >
                      <Input placeholder="Full name" size="large" />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[{ required: true, message: "Phone is required" }]}
                    >
                      <Input placeholder="Phone number" size="large" />
                    </Form.Item>
                  </div>
                  <Form.Item label="Địa chỉ" name="selectedAddress">
                    {userInfo.address.map((address, index) => (
                      <div key={address.id} className="address-button-wrapper">
                        <span>{address.fullAddress}</span>
                        <Button
                          className={
                            selectedAddress === address.id ? "selected" : ""
                          }
                          onClick={() => handleClick(address.id)}
                        >
                          {selectedAddress === address.id ? "Đã chọn" : "Chọn"}
                        </Button>
                      </div>
                    ))}
                  </Form.Item>
                </div>
                <div className="">
                  <button className="btn btn-primary">Thêm địa chỉ</button>
                </div>
              </Form>
            </div>
            <div className="col-6">
              <div className="checkout-details">
                <div className="order-box">
                  <div className="title-box">
                    <div>
                      Sản phẩm <span>Giá</span>
                    </div>
                  </div>

                  <ul className="qty">
                    {checkOutProducts?.map((p, index) => {
                      return (
                        <li key={index}>
                          {p.nameProduct} × {p.quantity}{" "}
                          <span>
                            {" "}
                            {p.priceCore === p.pricePromotion
                              ? (p.priceCore * p.quantity).toLocaleString()
                              : (
                                  p.pricePromotion * p.quantity
                                ).toLocaleString()}{" "}
                            VNĐ
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="sub-total">
                    <li>
                      Tổng đơn giá{" "}
                      <span className="count">
                        {getSubTotalPrice().toLocaleString()} VNĐ
                      </span>
                    </li>
                    <li>
                      Phí ship :
                      <span className="count">
                        Nhân viên sẽ liên hệ xác nhận và báo phí ship sau !!
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="payment-box">
                  <div className="text-end">
                    <button
                      onClick={addOrderSubmitHandle}
                      className="btn btn-dark"
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Checkout };
