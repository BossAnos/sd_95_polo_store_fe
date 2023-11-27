import { Checkbox, Form, Input, Select } from "antd";
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
      const selectedAdress = formValue.selectedAdress;
      const address = userInfo.address.find(
        (address) => address.id == selectedAdress
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
                  <Form.Item
                    label="Địa chỉ"
                    name="selectedAddress"
                    rules={[{ required: true, message: "Address is required" }]}
                  >
                    <Select placeholder="Select address" size="large">
                      {userInfo.address.map((address) => (
                        <Select.Option key={address.id} value={address.id}>
                          {`${address.fullAddress}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Checkbox>Save address for next time</Checkbox>
                  <button
                    className="btn btn-primary"
                    onClick={addOrderSubmitHandle}
                  >
                    Đặt hàng
                  </button>
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
