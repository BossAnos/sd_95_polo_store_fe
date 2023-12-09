import { useEffect, useState } from "react";
import { adminService } from "../../../service/admin";
import { Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const AdminList = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    (async () => {
      const body = await adminService.getAllAdmin();
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
        <Button type="primary" className="btn-customer__add">
          Thêm nhân viên
        </Button>
      </Link>
      <br></br>
      <br></br>
      <div className="table__main--customer">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ Và Tên</th>

              <th>Số điện thoại</th>
              <th>Chức vụ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((admin, index) => {
              return (
                <tr key={admin.id}>
                  <td style={{ paddingLeft: "60px" }}>{index + 1} </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={admin.avatar}
                            alt="Avatar"
                            className="rounded-full"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{admin.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>{admin.phone}</td>
                  <td>{admin.role.name}</td>
                  <td>
                    <div
                      className="actions"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="action">
                        <Link to={`/admin/customer/update/${admin.id}`}>
                          <Button type="primary" className="btn">
                            <i className="fa-regular fa-pen-to-square"></i>
                          </Button>
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

export { AdminList };
