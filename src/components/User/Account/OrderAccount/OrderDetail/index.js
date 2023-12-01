import React, { useEffect, useState } from "react";
import { orderService } from "../../../../../service/user";
import { Button, Popconfirm, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import { Status_Order, Status_Order_Map } from "../../../../common/StatusOrder";
import { useNavigate } from "react-router-dom";
import { toastService } from "../.././../../../service/common";
import OrderStatus from "../../../../common/StatusOrder/OrderStatusTimeLine";
import { format } from "date-fns";

const OrderDetailUser = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  console.log(id);

  useEffect(() => {
    (async () => {
      try {
        const res = await orderService.getOneOrderForUser(id);
        setProducts(res.data.orderDetailResponse);
        console.log(products);
        setOrder(res.data);
        console.log(order);
        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>Đơn hàng ĐH{order.id} ----</div>
        {!order.showUpdateStatusForm && (
          <div>{Status_Order_Map[order.status]}</div>
        )}
      </div>
      {!order.showUpdateStatusForm && (
        <OrderStatus currentStatus={order.status} order={order} />
      )}
      <br></br>
      <h5>Thông tin sản phẩm</h5>
      <br></br>
      <hr></hr>
      <br></br>
      {products.map((p, index) => {
        return (
          <tr key={index}>
            <td style={{ width: "1000px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={p.image}
                  style={{ width: "70px", marginRight: "10px" }}
                />
                <div>
                  <div>{p.nameProduct}</div>
                  <div>
                    Size: {p.nameSize}, Màu: {p.nameColor}
                  </div>
                  <div>Số lượng: {p.quantity}</div>
                </div>
              </div>
            </td>
            <td style={{ color: "red" }}>{p.price} VNĐ</td>
          </tr>
        );
      })}
      ;<br></br>
      <hr></hr>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          <h2>Thông tin khách hàng</h2>
          <div>Tên người nhận: {order.username}</div>
          <div>Địa chỉ nhận hàng: {order.address}</div>
          <div>Số điện thoại: {order.phone}</div>
        </div>
        <div style={{ marginRight: "0px" }}>
          <h2>Chi tiết thanh toán</h2>
          <div>Đơn giá: {order.totalPrice} VNĐ</div>
          <div>Phương thức thanh toán: {order.nameTransaction}</div>
        </div>
      </div>
    </>
  );
};

export { OrderDetailUser };
