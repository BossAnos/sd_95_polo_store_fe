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
import OrderDetailModal from "../OrderDetail/OrderDetail";
import { SelectSearch } from "../../../common/SelectSearch";
import { LoadingBox } from "../../../common";
import { Link } from "react-router-dom";
import "../oder.css";
const { TabPane } = Tabs;

const tabs = [
  {
    key: "all",
    label: `Tất cả`,
    status: null,
  },
  {
    key: 1,
    label: `Chờ xác nhận`,
    status: 1,
  },
  {
    key: 2,
    label: `Đã xác nhận`,
    status: 2,
  },
  {
    key: 3,
    label: `Chuẩn bị hàng`,
    status: 3,
  },
  {
    key: 4,
    label: `Đang giao hàng`,
    status: 4,
  },
  {
    key: 5,
    label: `Hoàn thành`,
    status: 5,
  },
  {
    key: 6,
    label: `Đơn bị hoàn`,
    status: 6,
  },
  {
    key: 7,
    label: `Đã Hủy`,
    status: 7,
  },
  {
    key: 8,
    label: `Đơn giao lại`,
    status: 8,
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
    case 5:
      return [
        {
          value: 5,
          label: "Đã hoàn thành",
        },
      ];
    case 6:
      return Status_Order.filter((status) => [7, 8].includes(status.value));
    case 7:
      return [
        {
          value: 7,
          label: "Đã hủy",
        },
      ];
    case 8:
      return Status_Order.filter((status) => [5, 7].includes(status.value));

    default:
      return [];
  }
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  const [statusCode, setStatusCode] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [currentTab, setCurrentTab] = useState(0);
  const [filterForm] = Form.useForm();
  const LIMIT = 10;
  const [loading, setLoading] = useState(true);
  const [showStatus2Modal, setShowStatus2Modal] = useState(false);
  const [note, setNote] = useState("");
  const [shipCost, setShipCost] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [cancelModalOrderId, setCancelModalOrderId] = useState(null);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [searchUsername, setSearchUsername] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchdAddress, setSearchAddress] = useState("");

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };
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

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const getOrderLengthByStatus = (status) => {
    if (status === null) {
      return orders.length; // Độ dài của tất cả các đơn hàng
    }
    return orders.filter((order) => order.status === status).length;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders);
        console.log(orders);
        orders.forEach((order) => {
          const transactions = order.transactions;
          console.log(transactions);
        });
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    };

    fetchOrders();
  });

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

  const filterOrders = () => {
    return orders.filter((order) => {
      const username =
        !searchUsername ||
        order.username.toLowerCase().includes(searchUsername.toLowerCase());
      const phone =
        !searchPhone ||
        (order.phone &&
          order.phone.toLowerCase().includes(searchPhone.toLowerCase()));
      const address =
        !searchdAddress ||
        (order.address &&
          order.address.toLowerCase().includes(searchdAddress.toLowerCase()));

      return username && phone && address;
    });
  };

  const filteredOrders =
    activeTab === "all"
      ? filterOrders()
      : filterOrders().filter(
          (item) => item.status === parseInt(activeTab, 10)
        );

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
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Tabs
        style={{ marginLeft: "20px" }}
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        {tabs.map((tab) => (
          <TabPane
            tab={`${tab.label} (${getOrderLengthByStatus(tab.status)})`}
            key={tab.key}
          />
        ))}
      </Tabs>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "27px" }}
      >
        <div style={{ marginRight: "16px" }}>
          <label>Tên khách hàng:</label>
          <Input
            placeholder="Search by product name..."
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
        </div>
        <div style={{ marginRight: "16px" }}>
          <label>Số điện thoại:</label>
          <Input
            placeholder="Search by category..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
        </div>
        <div style={{ marginRight: "16px" }}>
          <label>Địa chỉ :</label>
          <Input
            placeholder="Search by brand..."
            value={searchdAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </div>
      </div>
      <br></br>

      <table className="table">
        <thead style={{}}>
          <tr>
            <th
              colspan="10"
              style={{
                height: "10px",
                backgroundColor: "blueviolet",
                marginTop: "-100px",
              }}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders
            .slice((page - 1) * LIMIT, (page - 1) * LIMIT + LIMIT)
            .map((order) => {
              const createDate = new Date(order.create_date);
              const day = createDate.getDate();
              const month = createDate.getMonth() + 1;
              const year = createDate.getFullYear();
              const formattedDate = `${day}/${month}/${year}`;
              const formattedPrice = order.totalPrice.toLocaleString();
              let totalRevenue = order.totalPrice + order.shipCost;
              if (order.transactions.description === "Đã thanh toán") {
                if (order.shipCost !== null) {
                  totalRevenue += order.shipCost;
                } else {
                  totalRevenue = 0;
                }
              }

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
                    <td>
                      <div>
                        {order.transactions.description}
                        <br></br>
                        {totalRevenue !== 0 && (
                          <div>
                            Tổng thu:{" "}
                            <span style={{ color: "red" }}>
                              {totalRevenue.toLocaleString()} đ
                            </span>
                          </div>
                        )}
                        <br></br>
                        {order.admins && order.admins.name && (
                          <div>Người tạo: {order.admins.name}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        Tổng đơn hàng:
                        <p style={{ color: "red" }}>{formattedPrice} đ</p>
                      </div>
                      Trọng lượng đơn hàng: {order.weight}g
                      <br />
                      Hình thức: {order.shopping}
                      <br />
                      {order.shipCost !== null && order.shipCost !== 0 && (
                        <>
                          Phí ship: {order.shipCost.toLocaleString()} đ
                          <br />
                        </>
                      )}
                      <br />
                      <br></br>
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
                                  width: "170px",
                                }}
                              >
                                {option.value === 7 ? (
                                  <button
                                    style={{ width: "110px" }}
                                    className="btn btn-danger"
                                    disabled={order.isUpdating}
                                    onClick={() => openCancelModal(order.id)}
                                  >
                                    <p style={{ marginTop: "-5px" }}>
                                      {option.label}
                                    </p>
                                  </button>
                                ) : option.value === 2 ? (
                                  <button
                                    style={{
                                      width: "110px",
                                      paddingTop: "-100px",
                                    }}
                                    className="btn btn-primary"
                                    disabled={order.isUpdating}
                                    onClick={() => openStatus2Modal(order.id)}
                                  >
                                    <p style={{ marginTop: "-5px" }}>
                                      {option.label}
                                    </p>
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
                                      style={{
                                        width: "165px",
                                        paddingTop: "-100px",
                                      }}
                                      disabled={order.isUpdating}
                                    >
                                      <p style={{ marginTop: "-5px" }}>
                                        {option.label}
                                      </p>
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
                                    visible={
                                      showStatus2Modal &&
                                      order.id === cancelModalOrderId
                                    }
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
                                        width: "100px",
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
                    <td className="action">
                      <button
                        className="btn"
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
      </table>
      {isModalOpen && (
        <OrderDetailModal
          style={{ width: 700 }}
          id={selectedOrderId}
          onClose={() => setModalOpen(false)}
        />
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          defaultCurrent={1}
          total={filteredOrders.length}
          pageSize={LIMIT}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export { OrderList };
