import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
<<<<<<< HEAD
    balance:{type:Number, default:0, required:true}
=======
    balance:{type:Number, default:0}
>>>>>>> e3189ee76796291d4fe0a8556e92efe6f1808d3b
})

const walletModel = mongoose.model("wallet",walletSchema)

export default walletModel;