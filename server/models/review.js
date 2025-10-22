import mongoose from "mongoose";

const reviewModel = new mongoose.Schema({
    clientId : {type: mongoose.Schema.Types.ObjectId, ref: "User", requierd: true},
    freelancerId : {type: mongoose.Schema.Types.ObjectId, ref: "User", requierd: true},
    ratings : {type: Number, min:1, max:5, requierd: true},
    comment : {type : String},
    createdAt : {type : Timestamp, default: Date.now}
})


export default mongoose.model( "Review", reviewModel);