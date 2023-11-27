import { userAuthService } from "../auth";
import { userClient } from "../http";

export const getOrderForUser = async () => {
    const {id} = userAuthService.getAuthInfo();
    return await userClient.get(`http://localhost:8080/customer/order/${id}`);
  };

  