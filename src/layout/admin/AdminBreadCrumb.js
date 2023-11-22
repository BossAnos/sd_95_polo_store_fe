import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/admin": "Dashboard",
  "/admin/brand": "Brand List",
  "/admin/brands/add": "Add Brand",
  "/admin/categories": "Category List",
  "/admin/sizes": "Size List",
  "/admin/colors": "Color List",
  "/admin/materials": "Material List",
  "/admin/product": "Danh sách sản phẩm",
  "/admin/orders": "Order List",
  "/admin/discounts": "Discount List",
  "/admin/customer": "Customer List",
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
