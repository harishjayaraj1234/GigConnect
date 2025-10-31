import express from 'express'
import cloudinary from "../middleware/upload.js";
import upload from '../middleware/multer.js'
import userAuth from '../middleware/userAuth.js'
import gigModel from '../models/gigModel.js'

const gigsRouter = express.Router()

gigsRouter.post("/", userAuth, upload.single("gigImage"), async (req, res) => {
  try {
    const { title, description, category, budget, location } = req.body;


    if (!title || !description || !category || !budget || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing Details...",
      });
    }


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }


    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = uploadResult.secure_url;


    const clientId = req.cookies.userId;
    if (!clientId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }


    const gig = new gigModel({
      title,
      description,
      category,
      budget,
      location,
      image: imageUrl,
      clientId,
    });

    await gig.save();

    res.status(201).json({
      success: true,
      message: "Gig posted successfully",
      gig,
    });
  } catch (error) {
    console.error("Error creating gig:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
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