import { Checkbox, Form, Input, Select, Radio, Button, Space } from "antd";
import "./Checkout.css";
import { useEffect, useState } from "react";
import {
  userAuthService,
  cartService,
  orderService,
  transactionService,
} from "../../../service/user";
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
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    (async () => {
      try {
        const res = await cartService.getCheckoutByStatus();

        setCheckOutProducts(res.data.cartDetailResponses);
        console.log(checkOutProducts);

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
      const orderDetailRequest = checkOutProducts.map((cp) => {
        const price =
          cp.priceCore !== cp.pricePromotion ? cp.pricePromotion : cp.priceCore;

        return {
          price: price,
          productDetailId: cp.productDetailId,
          quantity: cp.quantity,
        };
      });

      const request = {
        ...formValue,
        address:
          userInfo.address.find((address) => address.id === selectedAddress)
            ?.fullAddress || "",
        orderDetailRequest,
        totalPrice: getSubTotalPrice(),
        weight: getWeight(),
      };

      const addOrderRes = await orderService.addOrder(userInfo.id, request);
      console.log(addOrderRes.data);
      const { id, totalPrice } = addOrderRes.data;
      console.log(addOrderRes.data);
      if (paymentMethod === "VNP") {
        const paymentUrlRes = await transactionService.TransactionUrl({
          orderId: id,
          totalPrice,
        });
        const { url } = paymentUrlRes.data;
        console.log(url);
        window.location.href = url;
      } else {
        console.log("ncc");
      }
      toastService.success("Checkout Successfully");
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

  const getWeight = () => {
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
        return total + product.weight * product.quantity;
      }, 0);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="checkout-page">
      <div className="breadcrumb-section">
        <div className="container">
          <h2 style={{fontWeight:"bolder",marginLeft:"300px",marginTop:"30px"}}>THANH TOÁN</h2>
        </div>
      </div>
      <div className="section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Form layout="vertical" form={form}>
                <div>
                  <div className="d-flex custom-user-form"  style={{marginLeft:"300px",marginTop:"30px"}}>
                    <Form.Item
                      label="Tên người nhận"
                      name="username"
                      rules={[
                        { required: true, message: "Full name is required" },
                      ]}
                    >
                      <Input placeholder="Full name" size="large" style={{width:"200px"}} />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[{ required: true, message: "Phone is required" }]}
                    >
                      <Input placeholder="Phone number" size="large" style={{width:"200px"}}/>
                    </Form.Item>
                  </div >
                  <Form.Item  style={{marginLeft:"300px"}} label="Địa chỉ" name="selectedAddress">
                    {userInfo.address.map((address, index) => (
                      <div key={address.id} className="address-button-wrapper">
                        <span>{address.fullAddress}</span>
                        <button
                          className={
                            selectedAddress === address.id ? "selected" : ""
                          }
                          onClick={() => handleClick(address.id)}
                        >
                          {selectedAddress === address.id ? "Đã chọn" : "Chọn"}
                        </button>
                      </div>
                    ))}
                  </Form.Item>
                </div>
                <div className="">
                  <button className=""  style={{marginLeft:"300px"}}>Thêm địa chỉ</button>
                </div>
              </Form>
              <div  style={{marginLeft:"300px",marginTop:"30px"}}>
                <label>Phương thức thanh toán</label>
              </div>
              <Radio.Group  style={{marginLeft:"300px"}} value={paymentMethod}>
                <Space
                  direction="vertical"
                  onChange={(e) => setPaymentMethod(e.target.defaultValue)}
                >
                  <Radio value={"COD"} defaultChecked={true}>
                    Thanh toán khi nhận hàng
                  </Radio>
                  <Radio value={"VNP"}>Thanh toán bằng VNPAY</Radio>
                </Space>
              </Radio.Group>
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
