import { useEffect, useState } from "react";
import { adminAuthService } from "../../service/admin";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../../components/common";

const AdminGuard = ({ children }) => {
  const [isLogin, setIslogin] = useState(adminAuthService.isLogin());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/admin/login");
    } else {
      setLoading(false);
    }
  });

  return <>{loading ? <LoadingPage /> : children}</>;
};

export { AdminGuard };
