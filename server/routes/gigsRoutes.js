import express from 'express'
import gigModel from '../models/gigModel.js'

import userAuth from '../middleware/userAuth.js'


const gigsRouter = express.Router()

//POST         done
gigsRouter.post('/', userAuth, async(req,res)=>{
    const  {title, description, category, budget, location} = req.body;

    if(!title || !description || !category || !budget || !location){
        return res.status(400).json({sucess:false,message:"Missing Details..."});
    }

    const clientId = await req.cookies.userId;
    try {
        const gig = new gigModel({title, description, budget, category, location, clientId});
        await gig.save();
        
        return res.status(200).json({success:true, message : "Gig posted successfully!"})

        
    } catch (error) {
       return res.status(500).json({success: false, message : "Server error. Please try again later"});
    }
})


//GET           done
gigsRouter.get('/client', userAuth, async(req,res)=>{
    try{
        const gigs = await gigModel.find({clientId: req.body.userId})
        res.json(gigs)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
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


//Single Gig Information
gigsRouter.get('/:id', async(req, res) => {
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