import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const dataRevenue = [
  { date: "01/12", revenue: 5000000 },
  { date: "02/12", revenue: 10000000 },
  { date: "03/12", revenue: 2000000 },
  { date: "04/12", revenue: 15000000 },
  { date: "05/12", revenue: 8000000 },
  { date: "06/12", revenue: 500000 },
  { date: "07/12", revenue: 12000000 },
];

const yAxisTickFormatter = (value) => {
  if (value === 0) return "0tr";
  if (value === 1000000) return "1tr";
  if (value === 2000000) return "2tr";
  if (value === 5000000) return "5tr";
  if (value === 10000000) return "10tr";
  if (value === 20000000) return "20tr";
  return value;
};

const RevenueChart = () => {
  return (
    <div style={{ padding: "20px", borderRadius: "10px", background: "#fff" }}>
      <LineChart width={500} height={300} data={dataRevenue}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={yAxisTickFormatter} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RevenueChart;
