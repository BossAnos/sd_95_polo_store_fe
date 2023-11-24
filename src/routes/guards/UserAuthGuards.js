import { useEffect } from "react";
import { userAuthService } from "../../service/user";
import { useNavigateLoginPage } from "../../hook";

const UserAuthGuard = ({ children }) => {
  const [navigateUserLogin] = useNavigateLoginPage();

  useEffect(() => {
    if (!userAuthService.isLogin()) {
      navigateUserLogin();
    }
  }, []);

  return <>{children}</>;
};

export { UserAuthGuard };
