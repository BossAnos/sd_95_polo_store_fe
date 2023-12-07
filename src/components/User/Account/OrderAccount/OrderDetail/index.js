import React, { useEffect, useState } from "react";
import { orderService } from "../../../../../service/user";
import { Button, Popconfirm, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import { Status_Order, Status_Order_Map } from "../../../../common/StatusOrder";
import { useNavigate } from "react-router-dom";
import { toastService } from "../.././../../../service/common";
import OrderStatus from "../../../../common/StatusOrder/OrderStatusTimeLine";
import { format } from "date-fns";
import "./OrderDetail.css"
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
      <div className="text-top" style={{ display: "flex",margin:"40px 80px"}}>
        <div className="" style={{ marginRight: "10px" , fontWeight:"bolder"}}>Đơn hàng ĐH{order.id} ----</div>
        {!order.showUpdateStatusForm && (
          <div>{Status_Order_Map[order.status]}</div>
        )}
      </div>
      {!order.showUpdateStatusForm && (
        <OrderStatus currentStatus={order.status} order={order} />
      )}
      <br></br>
      <h5 style={{marginLeft:"78px"}}>Thông tin sản phẩm</h5>
      <br></br>
      <hr></hr>
      <br></br>
      {products.map((p, index) => {
        return (
          <tr key={index} className="tr-oder">
            <td style={{ width: "1000px" }}>
              <div style={{ display: "flex",padding:"0px 30px" }}>
                <img
                  src={p.image}
                  style={{ width: "70px", marginRight: "10px" }}
                />
                <div>
                  <div style={{paddingTop:"20px"}}>{p.nameProduct}</div>
                  <div>
                    Size: {p.nameSize}, Màu: {p.nameColor}
                  </div>
                  <div>Số lượng: {p.quantity}</div>
                </div>
              </div>
            </td>
            <td style={{ color: "red"  ,position:"relative"}}>
              <div style={{position:"absolute",top:"50px",right:"20px",width:"100px"}}>{p.price} VNĐ</div></td>
          </tr>
        );
      })}
      ;<br></br>
      <hr></hr>
      <div style={{ display: "flex",margin:"30px 78px" }}>
        <div style={{ marginRight: "20px" }}>
          <h2  style={{fontWeight:"bolder" , fontSize:"20px"}}>Thông tin khách hàng</h2>
          <div className="tennguoinhan">Tên người nhận: {order.username}</div>
          <div>Địa chỉ nhận hàng: {order.address}</div>
          <div>Số điện thoại: {order.phone}</div>
        </div>
        <div className="container-chitietthanhtoan">
          <h2 style={{fontWeight:"bolder", fontSize:"20px"}}>Chi tiết thanh toán</h2>
          <div className="divdongia">Đơn giá:<p className="dongia"> {order.totalPrice} VNĐ</p></div>
          <div>Phí ship: </div>
          <div>Phương thức thanh toán: {order.nameTransaction}</div>
        </div>
      </div>
    </>
  );
};

export { OrderDetailUser };
