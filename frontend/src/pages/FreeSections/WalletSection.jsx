import React, { useEffect, useState } from "react";
import axios from "axios";

const WalletSection = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId"); // stored at login

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  const fetchWalletDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wallet/${userId}`
      );
      setBalance(response.data.balance);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const handleAddFunds = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/wallet/add`, {
        userId,
        amount: 1000,
      });
      fetchWalletDetails();
      alert("₹1000 added to wallet!");
    } catch (err) {
      console.error(err);
      alert("Failed to add funds.");
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/wallet/withdraw`, {
        userId,
        amount: 500,
      });
      fetchWalletDetails();
      alert("₹500 withdrawn successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to withdraw funds.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg font-medium mb-2">
          Balance:{" "}
          <span className="text-green-600 font-semibold">₹{balance}</span>
        </p>
        <div className="mt-4 space-x-2">
          <button
            onClick={handleAddFunds}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Funds
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Transaction History</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="py-2">{txn.description}</td>
                  <td
                    className={`py-2 ${
                      txn.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{txn.amount}
                  </td>
                  <td className="py-2 capitalize">{txn.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletSection;
