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

        
    } catch (error) {
       return res.status(500).json({success: false, message : "Server error. Please try again later"});
    }
})


 gigsRouter.get('/client', userAuth, async(req,res)=>{
    const allGigs = [
        {
            id: 1,
            title: "Web Design for Startup",
            category: "Design",
            price: 200,
            description: "Need a modern landing page for a new tech startup.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          },
          {
            id: 2,
            title: "Full Stack Developer Needed",
            category: "Development",
            price: 500,
            description: "Looking for MERN developer to build a dashboard.",
            image: "https://images.unsplash.com/photo-1581090465349-3e87e0a1b6af",
          },
          {
            id: 3,
            title: "Social Media Manager",
            category: "Marketing",
            price: 150,
            description: "Manage social channels for a lifestyle brand.",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
          }
    ]
    res.json(allGigs)



 })




//PUT       done
gigsRouter.put('/:id', userAuth, async(req,res)=>{
    try {
        const updatedGigs = await gigModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedGigs);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})


//PATCH                done
gigsRouter.patch('/:id/complete',userAuth,async(req,res)=>{
    try{
        const gig = await gigModel.findByIdAndDelete(req.params.id, {new:true})
        res.json(gig)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})


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


gigsRouter.get('/', async(req, res) => {
    try {
        const gigId = req.params.id;
        const gig = await gigModel.findOne({_id : gigId});


         if(!gig){
             res.status(404).json({success : false, message : "No Gig Found!!"});
         }

         res.status(200).json(gig);

    } catch (error) {
         res.status(500).json({success: false, message : "internal server error!"});
    }
})



export default gigsRouter