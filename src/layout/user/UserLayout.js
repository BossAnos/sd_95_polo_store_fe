import { Header } from "./Header";
import { Footer } from "./Footer";
import { UserContextProvider } from "../store";
import { UserBreadCrumb } from "./UserBreadCrumb";

const UserLayout = ({ children }) => {
  return (
    <UserContextProvider>
      <Header></Header>
      <div
        style={{
          padding: "1.5rem",
        }}
      >
        <div className="mb-3">
          <UserBreadCrumb />
        </div>
        {children}
      </div>
      <Footer></Footer>
    </UserContextProvider>
  );
};

export { UserLayout };
