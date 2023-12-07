import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const dataPieChart = [
  { name: "Đơn hoàn thành", value: 500, fill: "#00C49F", amount: 100000000 },
  { name: "Đơn đang giao", value: 200, fill: "#FFBB28", amount: 50000000 },
  { name: "Đơn hủy", value: 100, fill: "#FF8042", amount: 20000000 },
  { name: "Đơn giao lại", value: 300, fill: "#0088FE", amount: 80000000 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

const OrderStatusChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handlePieClick = (_, index) => {
    setActiveIndex(index);
    setTotalValue(dataPieChart[index].value);
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
          formatter={(value) => [`Số đơn: ${value}`, `Giá trị: ${totalAmount}`]}
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
