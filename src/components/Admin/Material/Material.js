import { useEffect, useState } from "react";
import { materialService } from "../../../service/admin";
import { Button, Popconfirm, Tabs, Form, Input, Switch } from "antd";
import { Link } from "react-router-dom";
import { AddMaterial } from "./AddMaterial/AddMaterial";
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

const MaterialList = () => {
  const [searchProductName, setSearchProductName] = useState("");
  const [material, setMaterial] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const body = await materialService.getAllMaterial();
      console.log("All Material:", body.data);
      setMaterial(body.data);
    };

    fetchData();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredMaterials = material.filter((item) => {
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
    const body = await materialService.changeStatus(id);

    toastService.info("Thay đổi trạng thái thành công ");
  };

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await materialService.changeStatus(id, newStatus);

    // Update the local state with the new status
    setMaterial((prevMaterials) =>
      prevMaterials.map((material) =>
        material.id === id ? { ...material, status: newStatus } : material
      )
    );
  }

  async function createMaterial(newMaterial) {
    const createdMaterial = await materialService.createMaterial(newMaterial);
    setMaterial((prevMaterials) => [...prevMaterials, createdMaterial]);
    setShowMaterialModal(false);
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <AddMaterial
        open={showMaterialModal}
        onMaterialFinish={createMaterial}
        onCancel={() => setShowMaterialModal(false)}
      />
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>
      <br />
      <div style={{ display: "flex", marginLeft: "0px" }}>
        <button
          onClick={() => setShowMaterialModal(true)}
          type="primary"
          className="btn-customer__add "
        >
          Thêm vật liệu
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
              <th>Tên vật liệu</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.length === 0 ? (
              <tr>
                <td colSpan="5">Không có giá trị.</td>
              </tr>
            ) : (
              filteredMaterials.map((material, index) => (
                <tr key={material.id}>
                  <td style={{ paddingLeft: "60px" }}>{index + 1}</td>
                  <td>{material.name}</td>
                  <td>{material.description}</td>
                  <td>
                    <Switch
                      checked={material.status === 1}
                      onChange={() => toggleStatus(material.id, material.status)}
                      style={{
                        backgroundColor: material.status === 1 ? "green" : "red",
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
                        <Link to={`/admin/material/update/${material.id}`}>
                          <Button type="primary" className="btn">
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

export { MaterialList };
 