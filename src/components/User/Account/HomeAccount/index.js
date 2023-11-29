import {Link} from "react-router-dom";
import "../Account.css"

const HomeAccount = () =>{
    return(
        <div className="account-container">
            <h1 className="text-taikhoan">Tài Khoản</h1>
            <Link to="/accountInfo" className="accountInfo">Thông tin cá nhân</Link>
            <p>Bạn có thể truy cập và sửa đổi thông tin cá nhân (tên,số điện thoại, v.v).Điều này có lợi cho quá trình mua hàng trực tuyến</p>
            <Link to="/accountAddress" className="accountInfo">Địa chỉ nhận hàng</Link>
            <p>Lưu tất cả địa chỉ giao hàng của bạn (Nhà, văn phòng, nơi cư trú của gia đình, v.v ). Bạn sẽ không phải điền lại địa chỉ giao hàng mỗi khi đặt hàng</p>
            <Link to="/accountOrder" className="accountInfo">Đơn hàng của bạn</Link>
            <p>Kiểm tra trạng thái và thông tin liên quan đến đơn hàng của bạn. Bạn có thể huỷ đơn hoặc có thể đặt lại hàng</p>
            <Link className="accountInfo">Đổi mật khẩu</Link>
            <p>Bạn có thể thay đổi mật khẩu. Để bảo mật thông tin cá nhân, bạn nên sử dụng một mật khẩu an toàn và thay đổi mật khẩu khi cần thiết</p>
            <button className="btn btn-dark">Đăng xuất</button>
        </div>
    );
};
export {HomeAccount}