import React, { useEffect, useState } from "react";
import { orderService } from "../../../../../service/user";
import { Button, Popconfirm, Tabs, Modal, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Status_Order, Status_Order_Map } from "../../../../common/StatusOrder";
import { useNavigate } from "react-router-dom";
import { toastService } from "../.././../../../service/common";
import OrderStatus from "../../../../common/StatusOrder/OrderStatusTimeLine";
import { format } from "date-fns";
import "./OrderDetail.css";

const OrderDetailUser = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  console.log(id);

  useEffect(() => {
    (async () => {
      try {
        const res = await orderService.getOneOrderForUser(id);
        setProducts(res.data.orderDetailResponse);
        console.log(res);
        console.log(products);
        setOrder(res.data);
        console.log(order);
        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, []);

  const handleCancelOrder = () => {
    setCancelModalVisible(true);
  };

  const handleCancelModalOk = async () => {
    try {
      // Gọi API để hủy đơn hàng với lý do `cancelReason`
      // await orderService.cancelOrder(id, cancelReason);
      // Cập nhật lại trạng thái đơn hàng
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 5, // 5 là trạng thái đã hủy
      }));
      toastService.success("Đã hủy đơn hàng thành công");
      setCancelModalVisible(false);
    } catch (error) {
      toastService.error(error.apiMessage);
    }
  };

  const handleCancelModalCancel = () => {
    setCancelModalVisible(false);
  };

  return (
    <>
      <div
        className="text-top"
        style={{ display: "flex", margin: "40px 80px" }}
      >
        <div className="" style={{ marginRight: "10px", fontWeight: "bolder" }}>
          Đơn hàng ĐH{order.id} ----
        </div>
        {!order.showUpdateStatusForm && (
          <div>{Status_Order_Map[order.status]}</div>
        )}
      </div>
      {!order.showUpdateStatusForm && (
        <OrderStatus currentStatus={order.status} order={order} />
      )}
      <br />
      <h5 style={{ marginLeft: "78px" }}>Thông tin sản phẩm</h5>
      <br />
      <hr />
      <br />
      {products.map((p, index) => {
        return (
          <tr key={index} className="tr-oder">
            <td style={{ width: "1000px" }}>
              <div style={{ display: "flex", padding: "0px 30px" }}>
                <img
                  src={p.image}
                  style={{ width: "70px", marginRight: "10px" }}
                />
                <div>
                  <div style={{ paddingTop: "20px" }}>{p.nameProduct}</div>
                  <div>
                    Size: {p.nameSize}, Màu: {p.nameColor}
                  </div>
                  <div>Số lượng: {p.quantity}</div>
                </div>
              </div>
            </td>
            <td style={{ color: "red", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "20px",
                  width: "100px",
                }}
              >
                {p.price && p.price.toLocaleString()} VNĐ
              </div>
            </td>
          </tr>
        );
      })}
      <br />
      <hr />
      <div style={{ display: "flex", margin: "30px 78px" }}>
        <div style={{ marginRight: "20px" }} className="info">
          <h2 style={{ fontWeight: "bolder", fontSize: "20px" }}>
            Thông tin khách hàng
          </h2>
          <div className="tennguoinhan">Tên người nhận: {order.username}</div>
          <div>Địa chỉ nhận hàng: {order.address}</div>
          <div>Số điện thoại: {order.phone}</div>
        </div>
        <div className="container-chitietthanhtoan">
          <h2 style={{ fontWeight: "bolder", fontSize: "20px" }}>
            Chi tiết thanh toán
          </h2>
          <div className="divdongia">
            Đơn giá:
            <p className="dongia">
              {" "}
              {order.totalPrice && order.totalPrice.toLocaleString()} VNĐ
            </p>
          </div>
          <div>
            Phí ship: {order.shipCost && order.shipCost.toLocaleString()} VNĐ
          </div>
          <div>Phương thức thanh toán: {order.nameTransaction}</div>
          {order.note && <div>Ghi chú: {order.note}</div>}
        </div>
      </div>
      {order.status === 1 && (
        <div
          style={{
            marginLeft: "80px",
            marginTop: "20px",
          }}
        >
          <Button type="primary" danger onClick={handleCancelOrder}>
            Hủy Đơn
          </Button>
        </div>
      )}
      <Modal
        title="Lý do hủy đơn"
        visible={cancelModalVisible}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <Form>
          <Form.Item label="Lý do">
            <Input.TextArea
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { OrderDetailUser };
