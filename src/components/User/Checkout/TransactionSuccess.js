import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const TransactionSuccess = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vnp_Amount = searchParams.get("vnp_Amount");
    const vnp_BankCode = searchParams.get("vnp_BankCode");
    const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
    const vnp_CardType = searchParams.get("vnp_CardType");
    const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
    const vnp_PayDate = searchParams.get("vnp_PayDate");
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const vnp_TmnCode = searchParams.get("vnp_TmnCode");
    const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_SecureHash = searchParams.get("vnp_SecureHash");

    // Set the transaction data
    setTransactionData({
      vnp_Amount: parseInt(vnp_Amount).toLocaleString(),
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash,
    });

    // Perform other necessary processing
  }, [location]);

  if (!transactionData) {
    // Render loading state or return null if needed
    return null;
  }

  return (
    <div>
      <h1>Thanh toán thành công!</h1>
      <p>Thông tin thanh toán:</p>
      <ul>
        <li> Ngân hàng: {transactionData.vnp_BankCode}</li>
        <li>Số giao dịch Ngân hàng: {transactionData.vnp_BankTranNo}</li>

        <li>Thông tin đơn hàng: ĐH{transactionData.vnp_OrderInfo}</li>
        <li>Ngày thanh toán: {transactionData.vnp_PayDate}</li>
        <li>Mã giao dịch: {transactionData.vnp_TxnRef}</li>
      </ul>
      <button className="btn btn-dark">
        <Link to={"/"}>Quay lại</Link>
      </button>
    </div>
  );
};

export { TransactionSuccess };
