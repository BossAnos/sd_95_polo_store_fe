import { useEffect, useState } from "react";
import { materialService } from "../../../service/admin";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";
import "../admin-product.css"
import { toastService } from "../../../service/common";

const { TabPane } = Tabs;
const handleDelete = async (id) => {
  const body = await materialService.changeStatus(id);

  toastService.info("Thay đổi trạng thái thành công ");
};
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

const MaterialList = () => {
  const [material, setMaterial] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    (async () => {
      const body = await materialService.getAllMaterial();
      console.log("All Material:", body.data); // Add this line to check the data received
      setMaterial(body.data);
    })();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredmaterials = material.filter(
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
      <Link to={"/admin/material/add"}>
        <Button type="primary" className="btn-customer__add ">Thêm vật liệu</Button>
      </Link>
      <br />
      <br />
      <div className="table__main">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên màu sắc</th>
            <th>Mô tả</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredmaterials.length === 0 ? (
            <tr>
              <td colSpan="4">Không có giá trị.</td>
            </tr>
          ) : (
            filteredmaterials.map((material, index) => {
              return (
                <tr key={material.id}>
                  <td style={{paddingLeft:"60px"}}>{index + 1}</td>
                  <td>{material.name}</td>
                  <td>{material.description}</td>
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
                      <div className="action">
                      <Popconfirm
                            title="Đổi trạng thái"
                            description="Bạn có chắc chắn muốn thay đổi trạng thái?"
                            onConfirm={() => handleDelete(material.id)}
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

export {MaterialList };
