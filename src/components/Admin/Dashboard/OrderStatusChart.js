import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const STATUS_LABELS = {
  1: "Chờ xác nhận",
  2: "Xác nhận",
  3: "Đang chuẩn bị hàng",
  4: "Đang giao hàng",
  5: "Hoàn thành",
  6: "Hàng bị hoàn",
  7: "Huỷ",
  8: "Giao lại",
};

const COLORS = [
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#FF6666",
  "#7CFC00",
  "#DA70D6",
  "#FF4500",
];

const OrderStatusChart = ({ orderData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [totalValue, setTotalValue] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total values based on order statuses
    const totalValues = orderData.reduce((acc, order) => {
      const status = order.status || "Không xác định"; // Use 'status' instead of 'transactions.value'
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Set the total values
    setTotalValue(totalValues);
    setTotalAmount(orderData.length);
  }, [orderData]);

  const dataPieChart = Object.keys(totalValue).map((status) => ({
    name: STATUS_LABELS[status] || "Không xác định",
    value: totalValue[status],
    fill: COLORS[status - 1] || "#CCCCCC", // Use the corresponding color from the COLORS array
    amount: totalValue[status],
  }));

  const handlePieClick = (_, index) => {
    setActiveIndex(index);
    setTotalAmount(dataPieChart[index].amount);
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <PieChart width={500} height={300}>
        <Pie
          data={dataPieChart}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          paddingAngle={0}
          onClick={handlePieClick}
        >
          {dataPieChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => [
            `Số đơn: ${value}`,
            `Tổng đơn hàng: ${totalAmount}`,
          ]}
        />
        <Legend
          formatter={(value, entry) =>
            `${entry.payload.name} (${entry.payload.value})`
          }
          align="center"
          layout="horizontal"
        />
      </PieChart>
    </div>
  );
};

export default OrderStatusChart;
