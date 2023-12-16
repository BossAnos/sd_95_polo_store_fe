import { useEffect, useState } from "react";
import { orderService } from "../../../../../service/user";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";
import { Status_Order, Status_Order_Map } from "../../../../common/StatusOrder";
import"../../Account.css"
const ListOrderAccount = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    (async () => {
      const body = await orderService.getOrderForUser();
      setOrder(body.data);
      console.log(order);
    })();
  }, []);
  return (
    <div>
      <h1 className="text-top" style={{ marginLeft: "50px", fontWeight: "bolder" }}>
        Đơn hàng của bạn
      </h1>
      <p className="text-top2" style={{ marginLeft: "50px" }}>
        Kiểm tra trạng thái và thông tin liên quan đến đơn hàng của bạn. Bạn có
        thể huỷ đơn hoặc có thể đặt lại hàng
      </p>
      <hr></hr>
      <div className="table__main">
        <table>
          <tbody>
            {order.length === 0 ? (
              <tr>
                <td colSpan="4">Không có địa chỉ nào.</td>
              </tr>
            ) : (
              order.map((order, index) => {
                const createDate = new Date(order.create_date);
                // Lấy ngày từ đối tượng Date
                const day = createDate.getDate();
                const month = createDate.getMonth() + 1;
                const year = createDate.getFullYear();
                // Định dạng chuỗi ngày tháng
                const formattedDate = `${day}/${month}/${year}`;
                const formattedPrice = order.totalPrice.toLocaleString();

                return (
                  <tr key={order.id}>
                    <td style={{ width: "1000px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "10px" }}>
                          Đơn hàng ĐH{order.id} ----
                        </div>
                        {!order.showUpdateStatusForm && (
                          <div style={{}}>{Status_Order_Map[order.status]}</div>
                        )}
                      </div>
                      Ngày đặt hàng : {formattedDate}
                      <br></br>
                      <div style={{ display: "flex" }}>
                        {" "}
                        Giá:{" "}
                        <p style={{ color: "red" }}>{formattedPrice} VNĐ</p>
                      </div>
                    </td>
                    <td>
                      <div
                        className="actions"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="action">
                          <Link to={`/order/${order.id}`}>
                            <button className="btn-xemchitiet">Xem chi tiết</button>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export { ListOrderAccount };
