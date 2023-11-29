const Status_Order = [
  { value: 1, label: "Chờ xác nhận" },
  { value: 2, label: "Xác nhận" },
  { value: 3, label: "Đang chuẩn bị hàng" },
  { value: 4, label: "Đang giao hàng" },
  { value: 5, label: "Hoàn thành" },
  { value: 6, label: "Hàng bị hoàn" },
  { value: 7, label: "Huỷ" },
  { value: 8, label: "Giao lại" },
];

const Status_Order_Map = Status_Order.reduce((acrr, pre) => {
  return {
    ...acrr,
    [pre.value]: pre.label,
  };
}, {});
export { Status_Order_Map, Status_Order };
