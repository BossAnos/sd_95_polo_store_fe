import React from "react";

function CurrencyFormatter({ amount }) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Không cần số lẻ cho tiền VND
  });

  return <>{formatter.format(amount)}</>;
}

export default CurrencyFormatter;
