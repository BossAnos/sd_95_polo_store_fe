import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/": "",
  "/products": "Chi tiết sản phẩm",
};

const UserBreadCrumb = () => {
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

export { UserBreadCrumb };
