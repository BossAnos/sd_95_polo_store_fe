import React, { useEffect, useState } from "react";
import { orderService } from "../../../../service/user";
import { Button, Popconfirm, Tabs, Modal, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Status_Order, Status_Order_Map } from "../../../common/StatusOrder";
import { useNavigate } from "react-router-dom";
import { toastService } from ".././../../../service/common";
import OrderStatus from "../../../common/StatusOrder/OrderStatusTimeLine";
import { format } from "date-fns";

const OrderDetailModal = ({ id, onClose }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await orderService.getOneOrderForUser(id);
        setProducts(res.data.orderDetailResponse);
        setOrder(res.data);
        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, [id]);

  const handleCancelOrder = () => {
    setCancelModalVisible(true);
  };

  const handleExportInvoice = () => {
    const url = `http://localhost:8080/admin/order/export/${id}`;
    window.open(url, "_blank");
  };

  const handleCancelModalOk = async () => {
    try {
      // Call the API to cancel the order with the cancelReason
      // await orderService.cancelOrder(id, cancelReason);
      // Update the order status
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 5, // 5 represents the cancelled status
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
    <Modal
      title={`Đơn hàng - ĐH${order.id}`}
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="export" onClick={handleExportInvoice}>
          Export hóa đơn
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={780}
    >
      <div style={{ width: 700 }}>
        {" "}
        {!order.showUpdateStatusForm && (
          <OrderStatus currentStatus={order.status} order={order} />
        )}
        <br />
        <h5>Thông tin sản phẩm</h5>
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
            <div>
              Ngày đặt hàng:{" "}
              {order.createAt && format(new Date(order.createAt), "dd/MM/yyyy")}
            </div>
            <div>
              Tổng cộng: {order.totalPrice && order.totalPrice.toLocaleString()}{" "}
              VNĐ
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
