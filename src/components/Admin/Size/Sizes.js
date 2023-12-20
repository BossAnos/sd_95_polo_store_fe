import { useEffect, useState } from "react";
import { sizeService } from "../../../service/admin";
import { Pagination, Button, Tabs, Form, Input, Switch } from "antd";
import { Link } from "react-router-dom";
import { AddSize } from "./AddSize/AddSize";
import { toastService } from "../../../service/common";
import "../admin-product.css";

const { TabPane } = Tabs;

const tabs = [
  {
    key: "all",
    label: "Tất cả",
    status: null,
  },
  {
    key: "1",
    label: "Đang hoạt động",
    status: 1,
  },
  {
    key: "0",
    label: "Ngừng hoạt động",
    status: 0,
  },
];

const SizeList = () => {
  const [searchProductName, setSearchProductName] = useState("");
  const [size, setSize] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const LIMIT = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [refreshList, setRefreshList] = useState(false);

  const fetchData = async () => {
    const body = await sizeService.getAllSizes();
    setSize(body.data);
  };

  useEffect(() => {
    fetchData();
  }, [refreshList]);

  const filteredProducts =
    activeTab === "all"
      ? size
      : size.filter((item) => {
          if (activeTab === "1") {
            // Hiển thị sản phẩm có status là 1 hoặc 3
            return [1, 3].includes(item.status);
          } else {
            // Hiển thị sản phẩm có status bằng giá trị của activeTab
            return item.status === parseInt(activeTab, 10);
          }
        });

  const onPageChange = async (page) => {
    setPage(page);
    const newStartIndex = (page - 1) * LIMIT;
    setStartIndex(newStartIndex);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredSizes = size.filter((item) => {
    const statusMatch =
      activeTab === "all" || item.status === parseInt(activeTab, 10);

    const nameMatch =
      item.name &&
      item.name.toLowerCase().includes(searchProductName?.toLowerCase() || "");

    const descriptionMatch =
      item.description &&
      item.description
        .toLowerCase()
        .includes(searchProductName?.toLowerCase() || "");

    const indexMatch = (item.index + 1)
      .toString()
      .includes(searchProductName?.toString() || "");

    return statusMatch && (nameMatch || descriptionMatch || indexMatch);
  });

  const handleDelete = async (id) => {
    const body = await sizeService.changeStatus(id);

    toastService.info("Thay đổi trạng thái thành công ");
  };

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      // Make the request to change the status using the colorService
      await sizeService.changeStatus(id);

      // Update the local state with the new status
      setSize((prevSizes) =>
        prevSizes.map((size) =>
          size.id === id ? { ...size, status: newStatus } : size
        )
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  }

  const handleList = () => {
    setShowSizeModal(false);
    setRefreshList((prevState) => !prevState);
    fetchData();
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <AddSize
        open={showSizeModal}
        onCreateSizeFinish={handleList}
        onCancel={() => setShowSizeModal(false)}
      />
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>
      <br />
      <div style={{ display: "flex", marginLeft: "0px" }}>
        <button
          onClick={() => setShowSizeModal(true)}
          type="primary"
          className="btn-customer__add "
        >
          Thêm size
          <i className="fas fa-plus" style={{ paddingLeft: "10px" }}></i>
        </button>
        <p style={{ fontWeight: "bolder", fontSize: "20px" }}>Tìm kiếm:</p>
        <Input
          style={{ width: "300px", marginLeft: "30px" }}
          placeholder="Search by product name..."
          value={searchProductName}
          onChange={(e) => setSearchProductName(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div className="table__main">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Size</th>
              <th>Mô tả</th>
              <th>Chiều dài áo</th>
              <th>Độ rộng áo</th>
              <th>Chiều dài tay áo</th>
              <th>Chiều dài vai</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSizes.length === 0 ? (
              <tr>
                <td colSpan="5">Không có giá trị.</td>
              </tr>
            ) : (
              filteredSizes
                .slice((page - 1) * LIMIT, page * LIMIT)
                .map((size, index) => (
                  <tr key={size.id}>
                    <td style={{ paddingLeft: "60px" }}>
                      {startIndex + index + 1}
                    </td>
                    <td>{size.name}</td>
                    <td>{size.description}</td>
                    <td>{size.shirtlength}</td>
                    <td>{size.shirtwidth}</td>
                    <td>{size.sleevelenght}</td>
                    <td>{size.shoulderlength}</td>
                    <td>
                      <Switch
                        checked={size.status === 1}
                        onChange={() => toggleStatus(size.id, size.status)}
                        style={{
                          backgroundColor: size.status === 1 ? "green" : "red",
                          width: "30px",
                        }}
                      />
                    </td>
                    <td>
                      <div
                        className="actions"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="action">
                          <Link to={`/admin/size/update/${size.id}`}>
                            <button
                              type="primary"
                              className="btn"
                              onClick={() => setShowSizeModal(true)}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        current={page}
        total={filteredProducts.length}
        pageSize={LIMIT}
        onChange={onPageChange}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export { SizeList };
