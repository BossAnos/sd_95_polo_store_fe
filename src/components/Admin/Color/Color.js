import { useEffect, useState } from "react";
import { colorService } from "../../../service/admin";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
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

const ColorList = () => {
  const [color, setColor] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const body = await colorService.getAllColors();
      console.log("All Color:", body.data); // Add this line to check the data received
      setColor(body.data);
    })();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredColors = color.filter(
    (item) => item.status === parseInt(activeTab, 10)
  );
  const handleDelete = async (id) => {
    const body = await colorService.changeStatus(id);

    toastService.info("Thay đổi trạng thái thành công ");
  };


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
      <Link to={"/admin/color/add"}>
        <Button type="primary" className="btn-customer__add ">
          Thêm màu sắc
        </Button>
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
            {filteredColors.length === 0 ? (
              <tr>
                <td colSpan="4">Không có giá trị.</td>
              </tr>
            ) : (
              filteredColors.map((color, index) => {
                return (
                  <tr key={color.id}>
                    <td style={{ paddingLeft: "60px" }}>{index + 1}</td>
                    <td>{color.name}</td>
                    <td>{color.description}</td>
                    <td>
                      <div
                        className="actions"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="action">
                          <Link to={`/admin/color/update/${color.id}`}>
                            <Button type="primary" className="btn">
                              <i className="fa-regular fa-pen-to-square"></i>
                            </Button>
                          </Link>
                        </div>
                        <div className="action">
                        <Popconfirm
                            title="Đổi trạng thái"
                            description="Bạn có chắc chắn muốn thay đổi trạng thái?"
                            onConfirm={() => handleDelete(color.id)}
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

export { ColorList };
