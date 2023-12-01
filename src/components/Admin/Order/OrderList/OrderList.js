import { useEffect, useState } from "react";
import { orderService } from "../../../../service/admin";
import {
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
  const [transaction, setTransactionData] = useState([]);

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
          // Perform further processing with transactions
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

  const updateOrderStatusHandle = (order, status) => {
    order.isUpdating = true;
    setOrders([...orders]);

    orderService
      .changeStatusOrder(order.id, status)
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
        <thead>
          <tr>
            <th
              colspan="10"
              style={{ height: "10px", backgroundColor: "blueviolet" }}
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
            <th>Trạng thái</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .slice((page - 1) * LIMIT, (page - 1) * LIMIT + LIMIT)
            .map((order) => {
              const createDate = new Date(order.create_date);
              // Lấy ngày từ đối tượng Date
              const day = createDate.getDate();
              const month = createDate.getMonth() + 1;
              const year = createDate.getFullYear();
              // Định dạng chuỗi ngày tháng
              const formattedDate = `${day}/${month}/${year}`;
              const formattedPrice = order.totalPrice.toLocaleString();

              return (
                <>
                  <tr key={order.id}>
                    <td
                      colSpan="7"
                      style={{ height: "10px", backgroundColor: "lightgray " }}
                    >
                      {formattedDate} | Mã đơn hàng : ĐH{order.id}
                    </td>
                  </tr>
                  <tr key={order.id}>
                    <td>
                      {order.username}
                      <br></br>
                      {order.phone}
                      <br></br>
                      {order.address}
                    </td>
                    <td> {order.transactions.description}</td>
                    <td>
                      Tổng đơn : {formattedPrice} VNĐ
                      <br></br>
                      Hình thức : {order.shopping}
                    </td>

                    <td>
                      {!order.showUpdateStatusForm && (
                        <div>{Status_Order_Map[order.status]}</div>
                      )}
                    </td>
                    <td
                      style={{
                        width: "auto",
                        minWidth: "250px",
                      }}
                    >
                      <div className="actions">
                        <div className="d-flex">
                          <Form.Item
                            style={{ margin: 0 }}
                            initialValue={order.status}
                          >
                            {getUpdateAbleStatus(order.status).map((option) => {
                              console.log(order.status);
                              return (
                                <Popconfirm
                                  title="Cập nhật"
                                  description="Bạn có chắc muốn xác nhận?"
                                  onConfirm={() =>
                                    updateOrderStatusHandle(order, option.value)
                                  }
                                  okText="Xác nhận"
                                  cancelText="Hủy"
                                >
                                  <button
                                    key={option.value}
                                    className={
                                      option.value === "CANCELED"
                                        ? "btn btn-danger"
                                        : "btn btn-primary"
                                    }
                                    disabled={order.isUpdating}
                                  >
                                    {option.label}
                                  </button>
                                </Popconfirm>
                              );
                            })}
                          </Form.Item>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
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
