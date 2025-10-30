import walletModel from "../models/walletModel.js"

export const withdrawFunds = async (req, res) => {
  try {

    const {userId, amount} = req.body

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid withdraw request." });
    }

   
    let wallet = await walletModel.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ success: false, message: "Wallet not found." });
    }


    if (wallet.balance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance." });
    }


    wallet.balance -= amount;
    await wallet.save()

    res.status(200).json({
      success: true,
      message: "Withdraw successful",
      newBalance: wallet.balance,
    });
  } catch (error) {
    console.error("Withdraw Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};









export const depositFunds = async (req, res) => {
  try {

    const {userId, amount} = req.body

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid deposit request." });
    }

   
    let wallet = await walletModel.findOne({ userId });
    if (!wallet) {
      wallet = new walletModel({userId, balance: amount})

    }else{
      wallet.balance += amount
    }
    await wallet.save()

    res.status(200).json({
      success: true,
      message: "Deposit successful.",
      newBalance: wallet.balance,
    });
  } catch (error) {
    console.error("Withdraw Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
