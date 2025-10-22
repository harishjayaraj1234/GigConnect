import express from 'express';
import reviewModel from '../models/reviewModel.js';
import userAuth from '../middleware/userAuth.js';
import mongoose from 'mongoose';


const reviewRouter = express.Router();


// review posting by clients
reviewRouter.post('/', userAuth, async(req, res) => {
    
    const { rating, comment, bookingId, freelancerId} = req.body;
    let clientId;
    clientId = req.cookies.userId;    
 
    try {
        let date = Date.now();
        const response = await reviewModel({ bookingId, clientId, freelancerId, rating, comment, date })
        response.save();

        if(response){
            res.status(200).json({success : true, message : "Your Review Successfully Posted"})
        }

    } catch (error) {
         return res.status(500).json({success: false, message : "Server error. Please try again later"});
    }
});

//single booking review
reviewRouter.get('/get', async(req, res) => {
    
    const id = req.body.bookingId;

    try {
        const review = await reviewModel.aggregate([ { 
                                                        $match : {
                                                            bookingId : new mongoose.Types.ObjectId(id)
                                                        }
                                                    } ]);
        
        if(!review){
            return res.status(404).json({success : true, message : "No Review found"})
        }

        res.status(200).json({success : true, message : review})

    } catch (error) {
          return res.status(500).json({success: false, message : "Server error. Please try again later"});
    }
})


//single freelancer all bookings reviews
reviewRouter.get('/all', async(req, res) => {
    
    const id = req.body.freelancerId;

    try {
        const review = await reviewModel.aggregate([ { 
                                                        $match : {
                                                            freelancerId : new mongoose.Types.ObjectId(id)
                                                        }
                                                    } ]);
        
        if(!review){
            return res.status(404).json({success : true, message : "No Review found"})
        }

        res.status(200).json({success : true, message : review})

    } catch (error) {
          return res.status(500).json({success: false, message : "Server error. Please try again later"});
    }
})






export default reviewRouter;