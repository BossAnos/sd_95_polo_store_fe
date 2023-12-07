import { useEffect, useState, Fragment } from "react";
import { orderService } from "../../../../service/admin";
import {
  Modal,
  Button,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Select,
  Tabs,
} from "antd";
import { toastService } from "../../../../service/common";
import { Status_Order, Status_Order_Map } from "../../../common/StatusOrder";
import { SelectSearch } from "../../../common/SelectSearch";
import { LoadingBox } from "../../../common";
import { Link } from "react-router-dom";
import "../oder.css"

const tabs = [
  {
    key: 1,
    label: `Chờ xác nhận`,
  },
  {
    key: 2,
    label: `Đã xác nhận`,
  },
  {
    key: 3,
    label: `Chuẩn bị hàng`,
  },
  {
    key: 4,
    label: `Đang giao hàng`,
  },
  {
    key: 5,
    label: `Hoàn thành`,
  },
  {
    key: 6,
    label: `Đơn bị hoàn`,
  },
  {
    key: 7,
    label: `Đã Hủy`,
  },
];

const getUpdateAbleStatus = (status) => {
  switch (status) {
    case 1:
      return Status_Order.filter((status) => [2, 7].includes(status.value));
    case 2:
      return Status_Order.filter((status) => [3, 7].includes(status.value));
    case 3:
      return Status_Order.filter((status) => [4, 7].includes(status.value));
    case 4:
      return Status_Order.filter((status) => [5, 6].includes(status.value));
    case 6:
      return Status_Order.filter((status) => [7, 8].includes(status.value));

    case 8:
      return Status_Order.filter((status) => [5].includes(status.value));

    default:
      return [];
  }
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [statusCode, setStatusCode] = useState(1);
  const [activeTab, setActiveTab] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
  const [filterForm] = Form.useForm();
  const LIMIT = 10;
  const [loading, setLoading] = useState(true);
  const [showStatus2Modal, setShowStatus2Modal] = useState(false);
  const [note, setNote] = useState("");
  const [shipCost, setShipCost] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [cancelModalOrderId, setCancelModalOrderId] = useState(null);

  const openCancelModal = (orderId) => {
    setCancelModalOrderId(orderId);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
  };

  const openStatus2Modal = (orderId) => {
    setCancelModalOrderId(orderId);
    setShowStatus2Modal(true);
  };

  const closeStatus2Modal = () => {
    setShowStatus2Modal(false);
  };

  const onPageChange = async (e) => {
    setPage(e);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const selectedTab = tabs.find((tab) => tab.key === currentTab);
        const orders = await getOrders({
          statusCode: selectedTab.key,
        });
        setOrders(orders);
        console.log(orders);
        orders.forEach((order) => {
          const transactions = order.transactions;
          console.log(transactions);
        });

        setPage(1);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    };

    fetchOrders();
  }, [currentTab]);

  async function getOrders(form) {
    try {
      setLoading(true);
      const { data } = await orderService.getOrders(form);
      setLoading(false);
      return data;
    } catch (error) {
      toastService.error(error.apiMessage);
      return [];
    }
  }

  const filterOrder = async (form) => {
    const selectedTab = tabs.find((tab) => tab.key === activeTab);
    const orders = await getOrders({
      ...form,
      statusCode: selectedTab.key,
    });
    setOrders(orders);
    setPage(1);
  };

  async function onSearchHandle(form) {
    filterOrder({
      ...form,
      status: statusCode,
    });
  }

  const toggleShowUpdateOrderForm = (order) => {
    const showUpdateStatusForm = !order.showUpdateStatusForm;
    order.showUpdateStatusForm = showUpdateStatusForm;
    setOrders([...orders]);
  };

  const updateOrderStatusHandle = (order, status, note, shipCost) => {
    order.isUpdating = true;
    setOrders([...orders]);

    const params = {
      status: status,
      note: note,
      shipCost: shipCost,
    };

    orderService
      .changeStatusOrder(order.id, params)
      .then(() => {
        order.status = status;
        order.showUpdateStatusForm = false;
        order.isUpdating = false;
        setOrders([...orders]);
        toastService.success("Cập nhật thành công");
      })
      .catch((err) => {
        toastService.error(err.apiMessage);
        order.showUpdateStatusForm = false;
        order.isUpdating = false;
        setOrders([...orders]);
      });
    setNote("");
    setShipCost(0);
    setShowStatus2Modal(false);
    setShowCancelModal(false);
    setCancelModalOrderId(null);
    console.log(params);
  };

  const orderStatusTabChangeHandle = (key) => {
    console.log("Selected Tab Key:", key);
    setCurrentTab(key);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        onChange={orderStatusTabChangeHandle}
        activeKey={currentTab}
      />
      <Form
        layout="inline"
        className="my-3"
        onFinish={onSearchHandle}
        form={filterForm}
      >
        <Form.Item name={"sodienthoai"}>
          <Input placeholder={"Số điện thoại"} />
        </Form.Item>
        <Form.Item name={"ghichu"}>
          <Input placeholder={"Ghi chú"} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </Form.Item>
      </Form>

      <table className="table">
        <thead style={{}}>
          <tr>
            <th
              colspan="10"
              style={{ height: "10px", backgroundColor: "blueviolet",marginTop:"-100px" }}
            >
              Quản lý hóa đơn
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Thanh toán</th>
            <th>Hóa đơn</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .slice((page - 1) * LIMIT, (page - 1) * LIMIT + LIMIT)
            .map((order) => {
              const createDate = new Date(order.create_date);
              const day = createDate.getDate();
              const month = createDate.getMonth() + 1;
              const year = createDate.getFullYear();
              const formattedDate = `${day}/${month}/${year}`;
              const formattedPrice = order.totalPrice.toLocaleString();

              return (
                <Fragment key={order.id}>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        height: "10px",
                        backgroundColor: "lightgray",
                      }}
                    >
                      {formattedDate} | Mã đơn hàng: ĐH{order.id} | Trạng thái :{" "}
                      {!order.showUpdateStatusForm && (
                        <div style={{ color: "red", display: "inline" }}>
                          {Status_Order_Map[order.status]}
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {order.username}
                      <br />
                      {order.phone}
                      <br />
                      {order.address}
                    </td>
                    <td>{order.transactions.description}</td>
                    <td>
                      <div  style={{display:"flex"}}>
                      Tổng đơn:<p  style={{color:"red"}}>{formattedPrice} VNĐ</p> 
                      </div>
                
                      Trọng lượng đơn hàng: {order.weight}g
                      <br />
                      Hình thức: {order.shopping}
                      <br></br>
                      {order.shipCost && order.shipCost !== 0 && (
                        <>
                          Phí ship: {order.shipCost.toLocaleString()} VNĐ
                          <br />
                        </>
                      )}
                      <br />
                    </td>

                    <td
                      style={{
                        width: "auto",
                        minWidth: "250px",
                      }}
                    >
                      <div className="actions" style={{ whiteSpace: "nowrap" }}>
                        <div className="d-flex">
                          <Form.Item
                            style={{ margin: 0 }}
                            initialValue={order.status}
                          >
                            {getUpdateAbleStatus(order.status).map((option) => (
                              <div
                                key={option.value}
                                style={{
                                  display: "inline-block",
                                  marginRight: "10px",
                                  width:"170px"
                                }}
                              >
                                {option.value === 7 ? (
                                  <button style={{  width:"110px"}}
                                    className="btn btn-danger"
                                    disabled={order.isUpdating}
                                    onClick={() => openCancelModal(order.id)}
                                  >
                                    <p style={{marginTop:"-5px"}}> {option.label}</p>
                                   
                                  </button>
                                ) : option.value === 2 ? (
                                  <button  style={{  width:"110px",paddingTop:"-100px"}}
                                    className="btn btn-primary"
                                    disabled={order.isUpdating}
                                    onClick={openStatus2Modal}
                                  >
                                    <p  style={{marginTop:"-5px"}}> {option.label}</p>
                                   
                                  </button>
                                ) : (
                                  <Popconfirm
                                    title="Cập nhật"
                                    description="Bạn có chắc muốn xác nhận?"
                                    onConfirm={() =>
                                      updateOrderStatusHandle(
                                        order,
                                        option.value
                                      )
                                    }
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                  >
                                    <button
                                      className="btn btn-primary"
                                      style={{  width:"165px",paddingTop:"-100px"}}
                                      disabled={order.isUpdating}
                                    >
                                      <p  style={{marginTop:"-5px"}}>  {option.label}</p>
                                    
                                    </button>
                                  </Popconfirm>
                                )}

                                {option.value === 7 && (
                                  <Modal
                                    visible={
                                      showCancelModal &&
                                      order.id === cancelModalOrderId
                                    }
                                    onCancel={closeCancelModal}
                                    onOk={() => {
                                      updateOrderStatusHandle(order, 7, note);
                                    }}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                    okButtonProps={{
                                      style: {
                                        backgroundColor: "green",
                                        color: "white",
                                      },
                                    }}
                                  >
                                    <h3>Ghi chú:</h3>
                                    <textarea
                                      style={{
                                        width: "400px",
                                        height: "100px",
                                      }}
                                      value={note}
                                      onChange={(e) => setNote(e.target.value)}
                                    ></textarea>
                                  </Modal>
                                )}

                                {option.value === 2 && (
                                  <Modal
                                    visible={showStatus2Modal}
                                    onCancel={closeStatus2Modal}
                                    onOk={() => {
                                      updateOrderStatusHandle(
                                        order,
                                        2,
                                        null,
                                        shipCost
                                      );
                                    }}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                    okButtonProps={{
                                      style: {
                                        backgroundColor: "blue",
                                        color: "white",
                                        width:"100px"
                                        
                                      },
                                    }}
                                  >
                                    <h3>Phí vận chuyển:</h3>
                                    <input
                                      type="text"
                                      value={shipCost}
                                      onChange={(e) =>
                                        setShipCost(e.target.value)
                                      }
                                      style={{ width: "100%" }}
                                    />
                                  </Modal>
                                )}
                              </div>
                            ))}
                          </Form.Item>
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
      </table>

      <Pagination
        defaultCurrent={1}
        total={orders.length}
        pageSize={LIMIT}
        onChange={onPageChange}
      />
    </div>
  );
};

export { OrderList };
