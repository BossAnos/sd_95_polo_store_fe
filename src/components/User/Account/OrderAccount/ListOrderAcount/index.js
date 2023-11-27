import { useEffect, useState } from "react";
import { orderService } from "../../../../../service/user";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";


const ListOrderAccount = () =>{
    const [order,setOrder] = useState([]);
    useEffect(() => {
        (async () => {
            const body = await orderService.getOrderForUser();
    setOrder(body.data);
    console.log(order);
        })();
      }, []);
    return(
        <div>
            <h1>Đơn hàng của bạn</h1>
            <p>Kiểm tra trạng thái và thông tin liên quan đến đơn hàng của bạn. Bạn có thể huỷ đơn hoặc có thể đặt lại hàng</p>
<hr></hr>
<div className="table__main">
      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {order.length === 0 ? (
            <tr>
              <td colSpan="4">Không có địa chỉ nào.</td>
            </tr>
          ) : (
            order.map((order, index) => {
              return (
                <tr key={order.id}>
                  <td>Đơn hàng ĐH{order.id}
                 --- {order.status}
                 <br></br>
                 {order.create_date}
                 <br></br>
                 {order.username}
                 {order.phone}
                 <br></br>
                 {order.address}
                 <br></br>
                 {order.totalPrice}VNĐ</td>
                  <td>
                    <div
                      className="actions"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="action">
                        <Link to={`/admin/brand/update/${order.id}`}>
                          <Button type="primary" className="btn">
                            <i className="fa-regular fa-pen-to-square"></i>
                          </Button>
                        </Link>
                      </div>
                      <div className="action">
                        <Popconfirm
                          title="Xoá khách hàng"
                          description="Bạn có chắc chắn muốn xoá khách hàng này?"
                          okText="Xoá"
                          cancelText="Huỷ"
                        >
                          <button className="btn">
                            <i className="fa-sharp fa-solid fa-trash"></i>
                          </button>
                        </Popconfirm>
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
export {ListOrderAccount}