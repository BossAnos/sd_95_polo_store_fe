import { useEffect, useState } from "react";
import { userAuthService } from "../../../../service/user";
import { Button, Popconfirm, Tabs } from "antd";
import { Link } from "react-router-dom";
import "../Account.css";
import AddAddress from "../../Address/CreateAddress/CreateAddress";

const AddressAcount = () => {
  const [address, setAddress] = useState([]);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  useEffect(() => {
    (async () => {
      const authInfo = await userAuthService.getAuthInfo();
      setAddress(authInfo.address);
      console.log(address);
    })();
  }, []);

  async function createAddress(newColor) {
    // const createdColor = await colorService.createColor(newColor);
    // setColor((prevColors) => [...prevColors, createdColor]);
    setShowColorModal(false);
  }

  const handleAddAddressSuccess = (newAddress) => {
    setAddress((prevAddress) => [...prevAddress, newAddress]); // Cập nhật dữ liệu địa chỉ
    setShowAddAddressModal(false); // Đóng Modal
  };
  return (
    <div>
      <AddAddress
        open={showAddAddressModal}
        onAddress={createAddress}
        onCancel={() => setShowAddAddressModal(false)}
        onAddSuccess={handleAddAddressSuccess} // Xử lý khi thêm địa chỉ thành công
      />
      <p className="text-top" style={{ marginLeft: "50px", fontWeight: "bolder" }}>
        ĐỊA CHỈ NHẬN HÀNG
      </p>
      <p  className="text-top2"  style={{ marginLeft: "50px" }}>
        Lưu tất cả địa chỉ giao hàng của bạn (Nhà, văn phòng, nơi cư trú của gia
        đình, v.v ). Bạn sẽ không phải điền lại địa chỉ giao hàng mỗi khi đặt
        hàng
      </p>
      <hr></hr>
      <div className="table__main">
        <table>
          <thead>
            <tr></tr>
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
                    <td>
                      {address.fullAddress}
                      {address.ward},{address.district},{address.city}
                    </td>
                    <td>
                      <div
                        className="actions"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="action">
                          <Link to={`/admin/brand/update/${address.id}`}>
                            <button type="primary" className="btn">
                              <i className="fa-regular fa-pen-to-square"></i>
                            </button>
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
      <button
        onClick={() => setShowAddAddressModal(true)}
        className="btn-themdiachi"
      >
        Thêm địa chỉ nhận hàng
      </button>
    </div>
  );
};
export { AddressAcount };
