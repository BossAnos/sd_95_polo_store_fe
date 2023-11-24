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
  getUserRoute({ path: "/login", component: UserLoginPage }),
  {
    path: "*",
    component: NotFoundPage,
  },
];

const privateRoutes = [];

export { adminRoutes, privateRoutes };
