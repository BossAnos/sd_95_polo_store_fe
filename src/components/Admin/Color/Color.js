import { useEffect, useState } from "react";
import { colorService } from "../../../service/admin";
import { Button, Popconfirm, Tabs, Form, Input, Switch } from "antd";
import { Link } from "react-router-dom";
import { AddColor } from "./AddColor/Addcolor";
import { useNavigate, useParams } from "react-router-dom";
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

const ColorList = () => {
  const [searchProductName, setSearchProductName] = useState("");
  const [color, setColor] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showColorModal, setShowColorModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const body = await colorService.getAllColors();
      console.log("All Color:", body.data);
      setColor(body.data);
    };

    fetchData();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredColors = color.filter((item) => {
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
    const body = await colorService.changeStatus(id);

    toastService.info("Thay đổi trạng thái thành công ");
  };

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await colorService.changeStatus(id, newStatus);

    // Update the local state with the new status
    setColor((prevColors) =>
      prevColors.map((color) =>
        color.id === id ? { ...color, status: newStatus } : color
      )
    );
  }

  async function createColor(newColor) {
    const createdColor = await colorService.createColor(newColor);
    setColor((prevColors) => [...prevColors, createdColor]);
    setShowColorModal(false);
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <AddColor
        open={showColorModal}
        onColorFinish={createColor}
        onCancel={() => setShowColorModal(false)}
      />
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>
      <br />
      <div style={{ display: "flex", marginLeft: "0px" }}>
        <button
          onClick={() => setShowColorModal(true)}
          type="primary"
          className="btn-customer__add "
        >
          Thêm màu sắc
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
              <th>Tên màu sắc</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredColors.length === 0 ? (
              <tr>
                <td colSpan="5">Không có giá trị.</td>
              </tr>
            ) : (
              filteredColors.map((color, index) => (
                <tr key={color.id}>
                  <td style={{ paddingLeft: "60px" }}>{index + 1}</td>
                  <td>{color.name}</td>
                  <td>{color.description}</td>
                  <td>
                    <Switch
                      checked={color.status === 1}
                      onChange={() => toggleStatus(color.id, color.status)}
                      style={{
                        backgroundColor: color.status === 1 ? "green" : "red",
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
                        <Link to={`/admin/color/update/${color.id}`}>
                          <Button type="primary" className="btn"   onClick={() => setShowColorModal(true)}>
                            <i className="fa-regular fa-pen-to-square"></i>
                          </Button>
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
    </div>
  );
};

export { ColorList };
