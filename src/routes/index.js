import { AdminLogin } from "../components/Admin/AdminLogin";
import { AdminGuard, UserAuthGuard } from "./guards";
import { NotFoundPage } from "../components/common";
import { Sidebar } from "../components/Admin/layout";
import { AdminDashBoard } from "../components/Admin/Dashboard";
const NoGuard = ({ children }) => {
  return <>{children}</>;
};

const getAdminRoute = ({ path, component }) => {
  return {
    path,
    component,
    layout: Sidebar,
    guard: AdminGuard,
  };
};

// const getUserRoute = ({ path, component, guard }) => {
//   return {
//     path,
//     component,
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
  //   getAdminRoute({ path: "admin/chatlieu", component: ChatLieuList }),
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
