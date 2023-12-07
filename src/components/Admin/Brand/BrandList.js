import { useEffect, useState } from "react";
import { brandService } from "../../../service/admin";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";
import { toastService } from "../../../service/common";
import "../admin-product.css";

const { TabPane } = Tabs;

const tabs = [
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
  const [brand, setBrand] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    (async () => {
      const body = await brandService.getAllBrands();
      console.log("All Brands:", body.data); // Add this line to check the data received
      setBrand(body.data);
    })();
  }, []);

  const handleDelete = async (id) => {
    const body = await brandService.changeStatus(id);

    toastService.info("Thay đổi trạng thái thành công ");
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredBrands = brand.filter(
    (item) => item.status === parseInt(activeTab, 10)
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>
      <br />
      <Link to={"/admin/brand/add"}>
        <Button type="primary" className="btn-customer__add ">
          Thêm thương hiệu
        </Button>
      </Link>
      <br />
      <br />
      <div className="table__main">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên thương hiệu</th>
              <th>Mô tả</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.length === 0 ? (
              <tr>
                <td colSpan="4">Không có giá trị.</td>
              </tr>
            ) : (
              filteredBrands.map((brand, index) => {
                return (
                  <tr key={brand.id}>
                    <td style={{ paddingLeft: "60px" }}>{index + 1}</td>
                    <td>{brand.name}</td>
                    <td>{brand.description}</td>
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
                        <div className="action">
                          <Popconfirm
                            title="Đổi trạng thái"
                            description="Bạn có chắc chắn muốn thay đổi trạng thái?"
                            onConfirm={() => handleDelete(brand.id)}
                            okText="Yes"
                            cancelText="No"
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

export { BrandList };
