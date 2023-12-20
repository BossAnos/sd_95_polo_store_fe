import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/admin": "Dashboard",
  "/admin/brand": "Danh sách thương hiệu",
  "/admin/brand/update": "Cập nhật thương hiệu",
  "/admin/brands/add": "Add Brand",
  "/admin/category": "Danh sách loại áo",
  "/admin/category/update": "Cập nhật loại áo",
  "/admin/size": "Danh sách size",
  "/admin/size/update": "Cập nhật size",
  "/admin/color": "Danh sách màu sắc",
  "/admin/color/update": "Cập nhật màu sắc",
  "/admin/material": "Danh sách chất liệu",
  "/admin/material/update": "Cập nhật chất liệu",
  "/admin/product": "Danh sách sản phẩm",
  "/admin/product/add": "Thêm sản phẩm",
  "/admin/product/update": "Chi tiết sản phẩm",
  "/admin/orders": "Order List",
  "/admin/role": "Danh sách chức vụ",
  "/admin/role/update": "Cập nhật chức vụ",
  "/admin/Discount": "Danh sách khuyến mại",
  "/admin/discount": "Danh sách khuyến mại",
  "/admin/discount/addDiscountToProduct": "Thêm khuyến mại",
  "/admin/manger": "Danh sách nhân viên",
  "/admin/customer": "Danh sách khách hàng",
  
};

const AdminBreadCrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: (
        <Link to={url} style={{ fontSize: "15px", fontWeight: "bolder" }}>
          {breadcrumbNameMap[url]}
        </Link>
      ),
    };
  });

  return <Breadcrumb items={extraBreadcrumbItems} />;
};

export { AdminBreadCrumb };
