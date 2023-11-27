const Status_Order = [
    {value: 1, lable : "Chờ xác nhận"},
    {value: 2, lable : "Đang chuẩn bị hàng"},
    {value: 3, lable : "Đang giao hàng"},
    {value: 4, lable : "Hoàn thành"},
    {value: 5, lable : "Đơn hàng bị hoàn"},

];

const Status_Order_Map = Status_Order.reduce((acrr, pre) => {
    return {
        ...acrr,
        [pre.value]: pre.lable,
    };
},{});
export {Status_Order_Map,Status_Order};