import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RevenueChart = ({ orderData }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Calculate total revenue based on order dates
    const monthlyData = orderData.reduce((acc, order) => {
      if (order.confirmDate) {
        const month = order.confirmDate.substring(0, 7); // Extract the year and month
        const totalRevenue = acc[month]
          ? acc[month].revenue + order.totalPrice
          : order.totalPrice;
        acc[month] = { month, revenue: totalRevenue };
      }
      return acc;
    }, {});

    // Set the monthly data
    setMonthlyData(Object.values(monthlyData));
  }, [orderData]);

  const yAxisTickFormatter = (value) => {
    if (value === 0) return "0tr";
    if (value === 1000000) return "1tr";
    if (value === 2000000) return "2tr";
    if (value === 5000000) return "5tr";
    if (value === 10000000) return "10tr";
    if (value === 20000000) return "20tr";
    return value;
  };

  return (
    <div style={{ padding: "20px", borderRadius: "10px", background: "#fff" }}>
      <LineChart width={500} height={300} data={monthlyData}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={yAxisTickFormatter} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RevenueChart;
