import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaClipboard,
  FaShippingFast,
  FaShoppingBag,
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
              {/* Hiển thị dòng trạng thái */}
              {isStatusActive && !isLastStatus && (
                <div className="status-line"></div>
              )}
            </div>
            {!isLastStatus && (
              <div
                className={`status-connector ${isStatusActive ? "active" : ""}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}

      {shouldDisplayOptionalStatus && displayedOptionalStatus && (
        <>
          <div className="status-connector active"></div>
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
            {displayedOptionalStatus.dateKey &&
              order[displayedOptionalStatus.dateKey] && (
                <div className="status-date">
                  {format(
                    new Date(order[displayedOptionalStatus.dateKey]),
                    "dd/MM/yyyy"
                  )}
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderStatus;
