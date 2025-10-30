import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    balance:{type:Number, default:0, required:true}
})

const walletModel = mongoose.model("wallet",walletSchema)

export default walletModel;