import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const WalletSection = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId"); // stored at login

  const navigate = useNavigate()

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
  }

  const handleAddFunds = async (amount) => {

    const {data:keydata} = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment/getkey`)
    const {key} = keydata
    console.log(key);
    
    

    const {data:orderdata} = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`,{
        amount:"500"
    })
    const {order} = orderdata
    console.log(order)
    // alert(`Applied for: ${gig.title}`);

   
    const options = {
        key: key, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'GigConnect',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: `${import.meta.env.VITE_API_URL}/api/payment/verification`, // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }

//   const handleWithdraw = async () => {
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/wallet/withdraw`, {
//         userId,
//         amount: 500,
//       });
//       fetchWalletDetails();
//       alert("₹500 withdrawn successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to withdraw funds.");
//     }
//   };

   function goToWithdraw(){
    navigate("/api/wallet/withdraw")
   }


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
          
        <button onClick={goToWithdraw} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Withdraw</button>
          
         
          
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