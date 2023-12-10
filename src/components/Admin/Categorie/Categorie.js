import { useEffect, useState } from "react";
import { categoryService } from "../../../service/admin";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";
import "../admin-product.css"
import { toastService } from "../../../service/common";

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

const handleDelete = async (id) => {
  const body = await categoryService.changeStatus(id);

  toastService.info("Thay đổi trạng thái thành công ");
};


const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    (async () => {
      const body = await categoryService.getAllCategory();
      console.log("All Category:", body.data); // Add this line to check the data received
      setCategory(body.data);
    })();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredCategoryys = category.filter(
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
      <Link to={"/admin/category/add"}>
        <Button type="primary" className="btn-customer__add ">Thêm loại áo</Button>
      </Link>
      <br />
      <br />
      <div className="table__main">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên loại áo</th>
            <th>Mô tả</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategoryys.length === 0 ? (
            <tr>
              <td colSpan="4">Không có giá trị.</td>
            </tr>
          ) : (
            filteredCategoryys.map((category, index) => {
              return (
                <tr key={category.id}>
                  <td style={{paddingLeft:"60px"}}>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <div
                      className="actions"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="action">
                        <Link to={`/admin/category/update/${category.id}`}>
                          <Button type="primary" className="btn">
                            <i className="fa-regular fa-pen-to-square"></i>
                          </Button>
                        </Link>
                      </div>
                      <div className="action">
                      <Popconfirm
                            title="Đổi trạng thái"
                            description="Bạn có chắc chắn muốn thay đổi trạng thái?"
                            onConfirm={() => handleDelete(category.id)}
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

export { CategoryList };
