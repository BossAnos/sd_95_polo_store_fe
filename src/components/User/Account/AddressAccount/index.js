import { useEffect, useState } from "react";
import { userAuthService } from "../../../../service/user";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";


const AddressAcount = () =>{
    const [address,setAddress] = useState([]);
    useEffect(() => {
        (async () => {
            const authInfo = await userAuthService.getAuthInfo();
    setAddress(authInfo.address);
    console.log(address);
        })();
      }, []);
    return(
        <div>
            <h1>ĐỊA CHỈ NHẬN HÀNG</h1>
            <p>Lưu tất cả địa chỉ giao hàng của bạn (Nhà, văn phòng, nơi cư trú của gia đình, v.v ). Bạn sẽ không phải điền lại địa chỉ giao hàng mỗi khi đặt hàng</p>
<hr></hr>
<div className="table__main">
      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {address.length === 0 ? (
            <tr>
              <td colSpan="4">Không có địa chỉ nào.</td>
            </tr>
          ) : (
            address.map((address, index) => {
              return (
                <tr key={address.id}>
                  <td>{address.fullAddress}
                  {address.ward},{address.district},{address.city}</td>
                  <td>
                    <div
                      className="actions"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="action">
                        <Link to={`/admin/brand/update/${address.id}`}>
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
            })
          )}
        </tbody>
      </table>
      </div>
            <button className="btn btn-dark">Thêm địa chỉ nhận hàng</button>
        </div>
    );
};
export {AddressAcount}