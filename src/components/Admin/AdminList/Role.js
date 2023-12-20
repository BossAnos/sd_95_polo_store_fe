import { useEffect, useState } from "react";
import { roleService } from "../../../service/admin";
import { Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const RoleList = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    (async () => {
      const body = await roleService.getAllRole();
      setAdmin(body.data);
    })();
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <br></br>
      <Link to={"/admin/customer/add"}>
        <button type="primary" className="btn-customer__add">
          Thêm nhân viên
        </button>
      </Link>
      <br></br>
      <br></br>
      <div className="table__main--customer">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Chức vụ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((role, index) => {
              return (
                <tr key={role.id}>
                  <td style={{ paddingLeft: "60px" }}>{index + 1} </td>

                  <td>{role.name}</td>

                  <td>
                    <div
                      className="actions"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="action">
                        <Link to={`/admin/customer/update/${role.id}`}>
                          <button type="primary" className="btn">
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </Link>
                      </div>
                      <div className="action">
                        <Popconfirm
                          title="Cập nhật trạng thái"
                          description="Bạn có muốn cập nhật trạng thái nhân viên này?"
                          okText="Xoá"
                          cancelText="Huỷ"
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { RoleList };
