import { notification } from "antd";

class ToastService {
  error(message, description = "") {
    if (!message) {
      return;
    }
    notification.error({
      message,
      description,
    });
  }

  success(message, description = "") {
    notification.success({
      message,
      description,
    });
  }

  info(message, { onClick, description } = {}) {
    notification.info({
      message,
      description,
      onClick,
    });
  }
}

let toastService = new ToastService();
export default toastService;
