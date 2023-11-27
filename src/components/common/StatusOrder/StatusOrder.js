const Status_Order = [
    {value: 1, label : "Chờ xác nhận"},
    {value: 2, label : "Đang giao hàng"},
    {value: 3, label : "Đang chuẩn bi hàng"},
    {value: 4, label : "Hoàn thành"},
    {value: 5, label : "Hàng bị hoàn"},
    {value: 6, label : "Huỷ"},
    {value: 7, label : "Xác nhận"}

];

const Status_Order_Map = Status_Order.reduce((acrr, pre) => {
    return {
        ...acrr,
        [pre.value]: pre.label,
    };
},{});
export {Status_Order_Map,Status_Order};