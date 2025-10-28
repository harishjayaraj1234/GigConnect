import express from 'express';
import bookingModel from '../models/bookingModel.js'
import gigModel from '../models/gigModel.js';
import userAuth from '../middleware/userAuth.js';
import userModel from '../models/userModel.js';

const bookingRouter = express();


//Booking Gig on click
bookingRouter.get('/accept/:id', userAuth, async(req, res) => {        
    const gigId = req.params.id;
    console.log(gigId);
    
    try {

        const gig = await gigModel.findOne({ _id : gigId });
        
        if (!gig) {
            return res.status(404).json({ success: false, message: "Gig not found" });
        }
        
        let freelancerId = req.cookies.userId;
        let clientId = gig.clientId;
        let amount = gig.budget;
        let status = gig.status;

        console.log(req.cookies.userId)

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



bookingRouter.get('/all', userAuth, async (req, res) => {
  try {
    const uid = req.cookies.userId;

    const bookings = await bookingModel.find({ freelancerId: uid });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ success: false, message: "No Bookings Found!!" });
    }

    const bookingDetailArray = [];
    const uniqueGigIds = new Set();

    for (const booking of bookings) {
      // Skip duplicates
      if (uniqueGigIds.has(booking.gigId.toString())) continue;
      uniqueGigIds.add(booking.gigId.toString());

      const gigDetail = await gigModel.findById(booking.gigId);
      if (!gigDetail) continue;

      const clientName = await userModel.findById(gigDetail.clientId);
      if (!clientName) continue;

      const bookingObj = {
        gigId: gigDetail._id,
        bookingId : booking._id,
        name: clientName.name,
        title: gigDetail.title,
        status: booking.status,
        amount: gigDetail.budget,
      };

      bookingDetailArray.push(bookingObj);
    }

    res.status(200).json({
      success: true,
      total: bookingDetailArray.length,
      bookings: bookingDetailArray,
    });

  } catch (error) {
    console.error("Error in /all route:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});



bookingRouter.put('/status', async (req, res) => {
  try {
    const { status, bookingId } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required!" });
    }

    const updatedBooking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true } 
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully!",
      booking: updatedBooking,
    });

  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});











// click on single from list of bookings
bookingRouter.get('/:bookingId', async(req, res) => {            //  showing single booking
   
    const bookingId = req.params.bookingId;
    
    try {

        const bookedGig = await bookingModel.findOne({_id : bookingId})

        if(!bookedGig){
             return res.status(404).json({ success: false, message: "Gig not found" });
        }

        return res.status(200).json(bookedGig)
    
    } catch (error) {
        res.status(500).json({success: false, message : "internal server error!"});
    }  
    
})





export default bookingRouter;