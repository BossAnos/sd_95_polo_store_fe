import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LayoutDefault from "./components/layout/default";
import Account from "./pages/account";
import Dashboard from "./pages/dashboard";

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
          path="/account"
          element={
            <LayoutDefault>
              <Account />
            </LayoutDefault>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;