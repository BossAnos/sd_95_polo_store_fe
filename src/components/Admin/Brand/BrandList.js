import { useEffect, useState } from "react";
import { brandService } from "../../../service/admin";
import { Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const BrandList = () => {
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    (async () => {
      const body = await brandService.getAllBrands();
      setBrand(body.data);
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
      <Link to={"/admin/chatlieu/add"}>
        <Button type="primary">Thêm chất liệu sản phẩm</Button>
      </Link>
      <br></br>
      <br></br>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên thương hiệu</th>
            <th>Mô tả</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brand.map((banrd, index) => {
            return (
              <tr key={banrd.id}>
                <td>{index + 1}</td>
                <td>{banrd.name}</td>
                <td>{banrd.description}</td>
                <td>
                  <div
                    className="actions"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="action">
                      <Link to={`/admin/brand/update/${banrd.id}`}>
                        <Button type="primary" className="btn">
                          <i className="fa-regular fa-pen-to-square"></i>
                        </Button>
                      </Link>
                    </div>
                    <div className="action">
                      <Popconfirm
                        title="Xoá khách hàng"
                        description="Bạn có chắc chắn muốn xoá khách hàng này?"
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
  );
};

export { BrandList };
