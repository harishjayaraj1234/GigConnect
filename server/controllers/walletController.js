
import walletModel from "../models/walletModel.js"
import transactionModel from "../models/transactionModel.js"




export const withdrawFunds = async(req,res)=>{
    const {userId} = req.userId
    const {amount} = req.body

    try{
        // validate amount

        if(!amount || amount<=0){
            return res.status(400).json({success:false,message:"Invalid amount...."})
        }


        // fetch wallet

        const wallet = await walletModel.findOne({userId})
        if(!wallet){
            return res.status(404).json({success:false,message:"Wallet not found..."})
        }


        // check balance

        if(wallet.balance < amount){
            return res.status(400).json({success:false,message:"Insufficient balance...."})
        }


        // Record transaction

        const transaction = new transactionModel({
            userId,
            type:"withdraw",
            amount,
            status:"sucess",
            timestamp: new Date()
        })
        await transaction.save()
      

        // update wallet balance

        wallet.balance -= amount
        await wallet.save()

        return res.status(200).json({success:true,message:"withdraw successfull...", balance:wallet.balance})


    }catch(error){
        res.status(500).json({success:false,message:error})
    }
}