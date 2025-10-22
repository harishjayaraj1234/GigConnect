import express from 'express';
import bookingModel from '../models/bookingModel.js'
import gigModel from '../models/gigModel.js';
import userAuth from '../middleware/userAuth.js';

const bookingRouter = express();


//Booking Gig on click
bookingRouter.post('/accept/:id', userAuth, async(req, res) => {        
    const gigId = req.params.id;
    
    try {

        const gig = await gigModel.findOne({ _id : gigId });
        
        if (!gig) {
            return res.status(404).json({ success: false, message: "Gig not found" });
        }
        
        let freelancerId = req.cookies.userId;
        let clientId = gig.clientId;
        let amount = gig.budget;
        let status = gig.status;

        try {
            const response = new bookingModel({gigId, freelancerId, clientId, amount, status});
            await response.save();
            res.status(200).json({success:true, message: "Successfully Booked..."}) 

        } catch (error) {
            res.status(500).json({success:false, message: "Internal Server Error"}) 
        }
    

    } catch (error) {
        res.status(500).json({success: false, message : "internal server error"});
    }
})


// only visible on booking in my account
bookingRouter.get('/all', userAuth, async(req, res) => {            //all bookings           

    try {
        const uid = req.cookies.userId;
        const bookings = await bookingModel.find({freelancerId: uid});

        if(!bookings){
            res.status(404).json({success : false, message : "No Booking Found!!"});
        }

        res.status(200).json({success : true, bookings});
        
    } catch (error) {
        res.status(500).json({success: false, message : "internal server error!"});
    }

})

// click on single from list of bookings
bookingRouter.get('/:bookingId', async(req, res) => {            //  showing single booking
   
    const bookingId = req.params.bookingId;
    
    try {

        const bookedGig = await bookingModel.findOne({_id : bookingId})

        if(!bookedGig){
             return res.status(404).json({ success: false, message: "Gig not found" });
        }

        return res.status(200).json({success : true, bookedGig})
    
    } catch (error) {
        res.status(500).json({success: false, message : "internal server error!"});
    }  
    
})





export default bookingRouter;