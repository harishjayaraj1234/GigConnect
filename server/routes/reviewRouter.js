import express from 'express';
import reviewModel from '../models/reviewModel.js';
import userAuth from '../middleware/userAuth.js';
import mongoose from 'mongoose';


const reviewRouter = express.Router();


reviewRouter.post('/', userAuth, async (req, res) => {
  const { rating, comment, bookingId, freelancerId } = req.body;
  const clientId = req.cookies.userId;

  try {
    const existingReview = await reviewModel.findOne({ clientId, freelancerId, bookingId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already posted a review for this booking.",
      });
    }

    const date = Date.now();
    const newReview = new reviewModel({
      bookingId,
      clientId,
      freelancerId,
      rating,
      comment,
      date,
    });

    await newReview.save();

    return res.status(200).json({
      success: true,
      message: "Your review has been successfully posted.",
    });
  } catch (error) {
    console.error("Error posting review:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});


//single booking review
reviewRouter.get('/get/:id', async(req, res) => {
    
    const {id} = req.params;

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
reviewRouter.get('/all/:id', async(req, res) => {
    
    const { id }= req.params;

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