import express from "express";
import gigModel from "../models/gigModel.js";

import userAuth from "../middleware/userAuth.js";

const gigsRouter = express.Router();

/** 🔹 Create a new gig (POST /api/gigs) */
gigsRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    // Validate fields
    if (!title || !description || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new gig
    const newGig = new gigModel({
      title,
      description,
      price,
      category,
      image,
    });

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

/** 🔹 Get all gigs for freelancer (GET /api/gigs?freelancer=:id) */
gigsRouter.get("/", async (req, res) => {
  try {
    const { freelancer } = req.query;

    const gigs = freelancer ? await Gig.find({ freelancer }) : await Gig.find();

    res.status(200).json(gigs);
  } catch (error) {
    console.error("Error fetching gigs:", error);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
});

/** 🔹 Get single gig by ID (GET /api/gigs/:id) */
gigsRouter.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "freelancer",
      "name email"
    );
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json(gig);
  } catch (error) {
    console.error("Error fetching gig:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/** 🔹 Update a gig (PUT /api/gigs/:id) */
gigsRouter.put("/:id", async (req, res) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Gig updated", gig: updatedGig });
  } catch (error) {
    console.error("Error updating gig:", error);
    res.status(500).json({ message: "Failed to update gig" });
  }
});

/** 🔹 Delete a gig (DELETE /api/gigs/:id) */
gigsRouter.delete("/:id", async (req, res) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.json({ message: "Gig deleted" });
  } catch (error) {
    console.error("Error deleting gig:", error);
    res.status(500).json({ message: "Failed to delete gig" });
  }
});

export default gigsRouter;
