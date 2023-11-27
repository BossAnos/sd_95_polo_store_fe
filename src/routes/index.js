import { AdminLogin, AdminLayout } from "../layout/admin";
import { AdminGuard, UserAuthGuard } from "./guards";
import { NotFoundPage } from "../components/common";
// import { LayoutDefault } from "../components/Admin/layout/LayoutDefault";
import { AdminDashBoard } from "../components/Admin/Dashboard";
import {
  CustomerList,
  BrandList,
  ProductList,
  AddProduct,
} from "../components/Admin";
import { UserLayout } from "../layout/user/UserLayout";
import { UserLoginPage } from "../components/User/LoginPage";
import { HomePage } from "../components/User/HomePage";
import { UserProductDetail } from "../components/User/Product/UserProductDetail/UserProductDetail";
import { ColorList } from "../components/Admin/Color/Color";
import { SizeList } from "../components/Admin/Size/Sizes";
import { CategoryList } from "../components/Admin/Categorie/Categorie";
import { MaterialList } from "../components/Admin/Material/Material";
import { HomeAccount } from "../components/User/Account/HomeAccount";
import { AccountInfo } from "../components/User/Account/AccountInfo";
import { AddressAcount } from "../components/User/Account/AddressAccount";
import { ListOrderAccount } from "../components/User/Account/OrderAccount/ListOrderAcount";
import { OrderList } from "../components/Admin/Order/OrderList/OrderList";
import { Home } from "heroicons-react";
// import { ProductList, ColorList, BrandsList } from "../pages/admin";
const NoGuard = ({ children }) => {
  return <>{children}</>;
};

const getAdminRoute = ({ path, component }) => {
  return {
    path,
    component,
    layout: AdminLayout,
    guard: AdminGuard,
  };
};

const getUserRoute = ({ path, component, guard }) => {
  return {
    path,
    component,
    layout: UserLayout,
    guard: guard || NoGuard,
  };
};

const adminRoutes = [
  {
    path: "admin/login",
    component: AdminLogin,
  },
  getAdminRoute({
    path: "/admin",
    component: AdminDashBoard,
  }),
  getAdminRoute({
    path: "/admin/customer",
    component: CustomerList,
  }),
  getAdminRoute({
    path: "/admin/brand",
    component: BrandList,
  }),
  getAdminRoute({
    path: "/admin/color",
    component: ColorList,
  }),
  getAdminRoute({
    path: "/admin/size",
    component: SizeList,
  }),
  getAdminRoute({
    path: "/admin/material",
    component: MaterialList,
  }),
  getAdminRoute({
    path: "/admin/category",
    component: CategoryList,
  }),
  getAdminRoute({
    path: "/admin/product",
    component: ProductList,
  }),
  getAdminRoute({
    path: "/admin/product/update/:productId",
    component: AddProduct,
  }),
  getAdminRoute({
    path: "/admin/product/add",
    component: AddProduct,
  }),
  getAdminRoute({ path: "/admin/orders", component: OrderList }),
  // getAdminRoute({ path: "admin/product", component: ProductList }),
  // getAdminRoute({ path: "admin/color", component: ColorList }),
  // getAdminRoute({ path: "admin/brand", component: BrandsList }),
  //   getAdminRoute({ path: "/admin/chatlieu/add", component: AddChatLieu }),
  //   getAdminRoute({
  //     path: "/admin/chatlieu/update/:machatlieu",
  //     component: UpdateChatLieu,
  //   }),
  //   getUserRoute({ path: "/login", component: UserLoginPage }),
  //   getUserRoute({ path: "/", component: HomePage }),
  //   getUserRoute({ path: "/sanpham/:masanpham", component: UserProductDetail }),
  //   getUserRoute({ path: "/carts", component: UserCart, guard: UserAuthGuard }),
  getUserRoute({ path: "/", component: HomePage }),
  getUserRoute({ path: "/login", component: UserLoginPage }),
  getUserRoute({ path: "/products/:productId", component: UserProductDetail }),
   getUserRoute({ path: "/account", component: HomeAccount, guard: UserAuthGuard }),
   getUserRoute({ path: "/accountInfo", component: AccountInfo, guard: UserAuthGuard }),
   getUserRoute({ path: "/accountAddress", component: AddressAcount, guard: UserAuthGuard }),
   getUserRoute({ path: "/accountOrder", component: ListOrderAccount, guard: UserAuthGuard }),
  {
    path: "*",
    component: NotFoundPage,
  },
];

const privateRoutes = [];

export { adminRoutes, privateRoutes };
