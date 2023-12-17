import { useEffect, useState } from "react";
import { brandService } from "../../../service/admin";
import {
  Button,
  Tabs,
  Form,
  Input,
  Switch,
} from "antd";
import { Link } from "react-router-dom";
import { AddBrand } from "./AddBrand/AddBrand";
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

const BrandList = () => {
  const [searchProductName, setSearchProductName] = useState("");
  const [brand, setBrand] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const body = await brandService.getAllBrands();
    setBrand(body.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredBrands = brand.filter((item) => {
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
    const body = await brandService.changeStatus(id);

    toastService.info("Thay đổi trạng thái thành công ");
  };

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await brandService.changeStatus(id, newStatus);

    // Update the local state with the new status
    setBrand((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === id ? { ...brand, status: newStatus } : brand
      )
    );
  }

  const handleList = () => {
    setShowBrandModal(false);
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
      <AddBrand
        open={showBrandModal}
        onBrandFinish={handleList}
        onCancel={() => setShowBrandModal(false)}
      />
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>
      <br />
      <div style={{ display: "flex", marginLeft: "0px" }}>
        <button
          onClick={() => setShowBrandModal(true)}
          type="primary"
          className="btn-customer__add "
        >
          Thêm thương hiệu
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
              <th>Tên thương hiệu</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.length === 0 ? (
              <tr>
                <td colSpan="5">Không có giá trị.</td>
              </tr>
            ) : (
              filteredBrands.map((brand, index) => (
                <tr key={brand.id}>
                  <td style={{ paddingLeft: "60px" }}>{index + 1}</td>
                  <td>{brand.name}</td>
                  <td>{brand.description}</td>
                  <td>
                    <Switch
                      checked={brand.status === 1}
                      onChange={() => toggleStatus(brand.id, brand.status)}
                      style={{
                        backgroundColor: brand.status === 1 ? "green" : "red",
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
                        <Link to={`/admin/brand/update/${brand.id}`}>
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

export { BrandList };
