import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { adminRoutes, privateRoutes } from "./routes";
import axios from "axios";

const DefaultLayout = ({ children }) => {
  return <>{children}</>;
};

const NoGuard = ({ children }) => {
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {adminRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || DefaultLayout;
          let Guard = route.guard || NoGuard;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Page />
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
