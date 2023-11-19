import { AdminLogin, AdminLayout } from "../layout/admin";
import { AdminGuard, UserAuthGuard } from "./guards";
import { NotFoundPage } from "../components/common";
// import { LayoutDefault } from "../components/Admin/layout/LayoutDefault";
import { AdminDashBoard } from "../components/Admin/Dashboard";
import { CustomerList } from "../components/Admin";
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

// const getUserRoute = ({ path, component, guard }) => {
//   return {
//     path,
//     component, npm install react-app-rewired --save-dev
//     layout: UserLayout,
//     guard: guard || NoGuard,
//   };
// };

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
  {
    path: "*",
    component: NotFoundPage,
  },
];

const privateRoutes = [];

export { adminRoutes, privateRoutes };
