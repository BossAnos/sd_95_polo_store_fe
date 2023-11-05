import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LayoutDefault from "./components/layout/default";
import Account from "./pages/admin/account";
import Dashboard from "./pages/admin/dashboard";
import Products from "./pages/admin/products";
import Color from "./pages/admin/color";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/"
          element={
            <LayoutDefault>
              <Dashboard />
            </LayoutDefault>
          }
        />
        <Route
          path="/products"
          element={
            <LayoutDefault>
              <Products />
            </LayoutDefault>
          }
        />
        <Route
          path="/account"
          element={
            <LayoutDefault>
              <Account />
            </LayoutDefault>
          }
        />
        <Route
          path="/color"
          element={
            <LayoutDefault>
              <Color />
            </LayoutDefault>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;