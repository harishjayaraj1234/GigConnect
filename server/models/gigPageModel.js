import mongoose from "mongoose"

const gigSchema = new mongoose.Schema({

    title:String,
    description:String,
    status :{
        type:String,
        enum:['Open','Booked','Completed'],
        default:'Open'
    },
    clientId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookings:[{
        freelancerId :{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        appliedAt : Date
    }],
    createdAt:{type:Date,default:Date.now}



})

const gigPageModel = mongoose.model('Gigs',gigSchema)

export default gigPageModel