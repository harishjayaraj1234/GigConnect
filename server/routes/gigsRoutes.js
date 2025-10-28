import express from 'express'
import gigModel from '../models/gigModel.js'

import userAuth from '../middleware/userAuth.js'


const gigsRouter = express.Router()


gigsRouter.post('/', userAuth, async(req,res)=>{
    const  {title, description, category, budget, image, location} = req.body;

    console.log(title, description, category, budget, image, location)
    if(!title || !description || !category || !budget || !image || !location){
        return res.status(400).json({sucess:false,message:"Missing Details..."});
    }

    const clientId = await req.cookies.userId;
    try {
        const gig = new gigModel({title, description, category, budget, image, location, clientId});
        await gig.save();
        if(gig){
            return res.status(200).json({success:true, message : "Gig posted successfully"})
        }

    // Save to MongoDB
    const savedGig = await newGig.save();

    res.status(201).json({
      message: "Gig created successfully",
      gig: savedGig,
    });
  } catch (error) {
    console.error("Error creating gig:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//PUT       done
// gigsRouter.put('/:id', userAuth, async(req,res)=>{
//     try {
//         const updatedGigs = await gigModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
//         res.status(200).json(updatedGigs);
//     } catch (error) {
//         res.status(500).json({message : error.message});
//     }
// })

//     res.status(200).json(gigs);
//   } catch (error) {
//     console.error("Error fetching gigs:", error);
//     res.status(500).json({ message: "Failed to fetch gigs" });
//   }
// });

/** Get single gig by ID (GET /api/gigs/:id) */
gigsRouter.get("/:id", async (req, res) => {
  try {

    let id = req.params.id;
    id = id.replace(':','');

    const gig = await gigModel.findById(id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json(gig);
  } catch (error) {
    console.error("Error fetching gig:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//all gigs 
gigsRouter.get('/', async(req, res) => {
    try {
         const gig = await gigModel.find();
         if(!gig){
             res.status(404).json({success : false, message : "No Gig Found!!"});
         }

         res.status(200).json(gig);

    } catch (error) {
         res.status(500).json({success: false, message : "internal server error!"});
    }
})

//single gig
// gigsRouter.get('/:id', async(req, res) => {
//   console.log(req.params.id)
//     try {
//         const gigId = req.params.id;
//         const gig = await gigModel.findOne({_id : gigId});


//          if(!gig){
//              res.status(404).json({success : false, message : "No Gig Found!!"});
//          }

//          res.status(200).json(gig);

//     } catch (error) {
//          res.status(500).json({success: false, message : "internal server error!"});
//     }
// })



export default gigsRouter