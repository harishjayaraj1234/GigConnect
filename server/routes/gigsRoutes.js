import express from 'express'
import gigPageModel from '../models/gigPageModel.js'
import { verifyToken } from '../middleware/gigAuth.js'


const gigsRouter = express.Router()

//POST
gigsRouter.post('/', verifyToken,async (req,res)=>{
    const gig = new gigPageModel({...req.body,clientId:req.user.id})
    await gig.save()
    res.status(201).json(gig)
})



//GET
gigsRouter.get('/client', verifyToken,async(req,res)=>{
    const gigs = await gigPageModel.find({clientId: req.user.id})
    res.json(gigs)
})


//PUT
gigsRouter.put('/:id', verifyToken,async(req,res)=>{
    const updatedGigs = await gigPageModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(updatedGigs)
})


//PATCH
gigsRouter.patch('/:id/complete',verifyToken,async(req,res)=>{
    const gig = await gigPageModel.findByIdAndUpdate(req.params.id, {status:'Completed'}, {new:true})
    res.json(gig)
})

//GET
gigsRouter.get('/:id/bookings',verifyToken,async(req,res)=>{
    const gig = await gigPageModel.findById(req.params.id).populate('bookings.freelancerId')
    res.json(gig.bookings)
})

export default gigsRouter