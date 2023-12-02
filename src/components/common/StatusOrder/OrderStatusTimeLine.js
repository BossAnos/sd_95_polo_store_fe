import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaClipboard,
  FaShippingFast,
  FaShoppingBag,
  FaBan,
} from "react-icons/fa";
import "./TimeLineOrder.css";
import { TiArrowRight } from "react-icons/ti";
import { FaHandshake } from "react-icons/fa";
import { format } from "date-fns";

const OrderStatus = ({ currentStatus, order }) => {
  const mandatoryStatusList = [
    { value: 1, label: "Chờ xác nhận", icon: FaBoxOpen, dateKey: "createDate" },
    { value: 2, label: "Xác nhận", icon: FaClipboard, dateKey: "confirmDate" },
    {
      value: 3,
      label: "Đang chuẩn bị hàng",
      icon: FaShoppingBag,
      dateKey: "crateDate",
    },
    {
      value: 4,
      label: "Đang giao hàng",
      icon: FaShippingFast,
      dateKey: "shipDate",
    },
    // Commented out "Hủy" status to separate it from other statuses
    // { value: 7, label: "Hủy", icon: FaBan, dateKey: "cancelDate" },
  ];

  const optionalStatusList = [
    {
      value: 5,
      label: "Hoàn thành",
      icon: FaHandshake,
      dateKey: "successDate",
    },
    { value: 6, label: "Hàng bị hoàn", icon: TiArrowRight },
  ];

  const shouldDisplayOptionalStatus =
    currentStatus === 5 || currentStatus === 6;
  const displayedOptionalStatus = optionalStatusList.find(
    (status) => status.value === currentStatus
  );

  return (
    <div className="order-status-container">
      {mandatoryStatusList.map((status, index) => {
        const isStatusActive = status.value <= currentStatus;
        const isCurrentStatus = status.value === currentStatus;
        const isLastStatus = index === mandatoryStatusList.length - 1;
        const statusDate = order[status.dateKey];

        // Kiểm tra nếu trạng thái hiện tại là 7
        if (currentStatus === 7) {
          // Nếu trạng thái đang xét không phải là 7, ẩn nó
          if (status.value !== 7) {
            return null;
          }
        }

        return (
          <React.Fragment key={status.value}>
            <div className={`status-item ${isStatusActive ? "active" : ""}`}>
              <div
                className={`status-circle ${isStatusActive ? "active" : ""} ${
                  isCurrentStatus ? "current" : ""
                }`}
              >
                <div
                  className={`status-border ${isCurrentStatus ? "green" : ""}`}
                ></div>
                {status.icon && (
                  <status.icon
                    className="status-icon"
                    aria-label={status.label}
                  />
                )}
              </div>
              <span
                className={`status-label ${isStatusActive ? "active" : ""} ${
                  isCurrentStatus ? "current" : ""
                }`}
              >
                {status.label}
              </span>
              {/* Hiển thị ngày tương ứng */}
              {isStatusActive && statusDate && (
                <div className="status-date">
                  {format(new Date(statusDate), "dd/MM/yyyy")}
                </div>
              )}
            </div>
            {!isLastStatus && status.value !== 7 && (
              <div
                className={`status-connector ${isStatusActive ? "active" : ""}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}

      {/* Separate "Hủy" status from other statuses */}
      {currentStatus === 7 && (
        <div className="status-item active">
          <div className="status-circle active">
            <div className="status-border"></div>
            <FaBan className="status-icon" aria-label="Hủy" />
          </div>
          <span className="status-label active">Hủy</span>
          {/* Hiển thị ngày tương ứng */}
          {order.cancelDate && (
            <div className="status-date">
              {format(new Date(order.cancelDate), "dd/MM/yyyy")}
            </div>
          )}
        </div>
      )}

      {shouldDisplayOptionalStatus && displayedOptionalStatus && (
        <React.Fragment>
          <div className="status-connector"></div>
          <div className="status-item active">
            <div className="status-circle active">
              <div className="status-border green"></div>
              {displayedOptionalStatus.icon && (
                <displayedOptionalStatus.icon
                  className="status-icon"
                  aria-label={displayedOptionalStatus.label}
                />
              )}
            </div>
            <span className="status-label active">
              {displayedOptionalStatus.label}
            </span>
            {/* Hiển thị ngày tương ứng */}
            {order[displayedOptionalStatus.dateKey] && (
              <div className="status-date">
                {format(
                  new Date(order[displayedOptionalStatus.dateKey]),
                  "dd/MM/yyyy"
                )}
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderStatus;
