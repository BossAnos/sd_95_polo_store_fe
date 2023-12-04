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

import { UserCart } from "../components/User/Cart/UserCart";
import { Checkout } from "../components/User/Checkout/Checkout";

import { HomeAccount } from "../components/User/Account/HomeAccount";
import { AccountInfo } from "../components/User/Account/AccountInfo";
import { AddressAcount } from "../components/User/Account/AddressAccount";
import { ListOrderAccount } from "../components/User/Account/OrderAccount/ListOrderAcount";
import { OrderList } from "../components/Admin/Order/OrderList/OrderList";
import { Home } from "heroicons-react";
import { TransactionSuccess } from "../components/User/Checkout/TransactionSuccess";
// import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import { AddColor } from "../components/Admin/Color/AddColor/Addcolor";
// import { ProductList, ColorList, BrandsList } from "../pages/admin";
import { OrderDetailUser } from "../components/User/Account/OrderAccount/OrderDetail";
import { AddCategory } from "../components/Admin/Categorie/AddCategorie/AddCategori";
import { AddMaterial } from "../components/Admin/Material/AddMaterial/AddMaterial";
import { AddBrand } from "../components/Admin/Brand/AddBrand/AddBrand";
import { AddSize } from "../components/Admin/Size/AddSize/AddSize";
import { UpdateColor } from "../components/Admin/Color/UpdateColor/UpdateColor";
import { UpdateMaterial } from "../components/Admin/Material/UpdateMaterial/UpdateMaterial";
import { UpdateCategory } from "../components/Admin/Categorie/UpdateCategory/UpdateCtegory";
import { UpdateSize } from "../components/Admin/Size/UpdateSize/UpdateSize";
import { UpdateBrand } from "../components/Admin/Brand/UpdateBrand/UpdateBrand";
import { AddCustomer } from "../components/Admin/Customer/AddCustomer/AddCustomer";
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

const getMessageUrl = ({ path, component, guard }) => {
  return {
    path,
    component,
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
    path: "/admin/customer/add",
    component: AddCustomer,
  }),
  getAdminRoute({
    path: "/admin/brand",
    component: BrandList,
  }),
  getAdminRoute({
    path: "/admin/brand/add",
    component: AddBrand,
  }),
  getAdminRoute({
    path: "/admin/brand/update/:id",
    component: UpdateBrand,
  }),
  getAdminRoute({
    path: "/admin/color",
    component: ColorList,
  }),
  getAdminRoute({
    path: "admin/color/add",
    component: AddColor,
  }),
  getAdminRoute({
    path: "admin/color/update/:id",
    component: UpdateColor,
  }),
  getAdminRoute({
    path: "/admin/size",
    component: SizeList,
  }),
  getAdminRoute({
    path: "/admin/size/add",
    component: AddSize,
  }),
  getAdminRoute({
    path: "/admin/size/update/:id",
    component: UpdateSize,
  }),
  
  
  getAdminRoute({
    path: "/admin/material",
    component: MaterialList,
  }),
  getAdminRoute({
    path: "/admin/material/add",
    component: AddMaterial,
  }),
  getAdminRoute({
    path: "/admin/material/update/:id",
    component: UpdateMaterial,
  }),
  getAdminRoute({
    path: "/admin/category",
    component: CategoryList,
  }),
  getAdminRoute({
    path: "/admin/category/add",
    component: AddCategory,
  }),
  getAdminRoute({
    path: "/admin/category/update/:id",
    component: UpdateCategory,
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
  getMessageUrl({ path: "/success", component: TransactionSuccess }),
  getUserRoute({ path: "/login", component: UserLoginPage }),
  getUserRoute({ path: "/products/:productId", component: UserProductDetail }),
  getUserRoute({
    path: "/order/:id",
    component: OrderDetailUser,
    guard: UserAuthGuard,
  }),
  getUserRoute({ path: "/carts", component: UserCart, guard: UserAuthGuard }),
  getUserRoute({
    path: "/checkout",
    component: Checkout,
    guard: UserAuthGuard,
  }),
  getUserRoute({
    path: "/account",
    component: HomeAccount,
    guard: UserAuthGuard,
  }),
  getUserRoute({
    path: "/accountInfo",
    component: AccountInfo,
    guard: UserAuthGuard,
  }),
  getUserRoute({
    path: "/accountAddress",
    component: AddressAcount,
    guard: UserAuthGuard,
  }),
  getUserRoute({
    path: "/accountOrder",
    component: ListOrderAccount,
    guard: UserAuthGuard,
  }),
  {
    path: "*",
    component: NotFoundPage,
  },
];

const privateRoutes = [];

export { adminRoutes, privateRoutes };
