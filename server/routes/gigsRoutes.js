import express from "express";
import cloudinary from "../middleware/upload.js";
import upload from "../middleware/multer.js";
import userAuth from "../middleware/userAuth.js";
import gigModel from "../models/gigModel.js"; // ✅ Import Gig model

const gigsRouter = express.Router();

/**
 * 🔹 POST /api/gigs
 * Create a new gig (only for logged-in users)
 */
gigsRouter.post("/", userAuth, upload.single("gigImage"), async (req, res) => {
  try {
    const { title, description, category, budget, location } = req.body;

    // ✅ Check if all required fields are present
    if (!title || !description || !category || !budget || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing Details...",
      });
    }

    // ✅ Check if image file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // ✅ Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "gigconnect/gigImages",
    });
    const imageUrl = uploadResult.secure_url;

    // ✅ Get client ID from cookies (user must be authenticated)
    const clientId = req.cookies.userId;
    if (!clientId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // ✅ Create new gig document
    const gig = new gigModel({
      title,
      description,
      category,
      budget,
      location,
      image: imageUrl,
      clientId,
    });

    // ✅ Save gig to database
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

/**
 * 🔹 GET /api/gigs
 * Fetch all gigs or gigs filtered by freelancer ID
 * Example: /api/gigs?freelancer=12345
 */
gigsRouter.get("/", async (req, res) => {
  try {
    const { freelancer } = req.query;

    // ✅ If freelancer ID is provided, filter by it; otherwise fetch all gigs
    const gigs = freelancer
      ? await gigModel.find({ freelancer })
      : await gigModel.find();

    res.status(200).json(gigs);
  } catch (error) {
    console.error("Error fetching gigs:", error);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
});

/**
 * 🔹 GET /api/gigs/:id
 * Fetch a single gig by its ID
 */
gigsRouter.get("/:id", async (req, res) => {
  try {
    const gig = await gigModel.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json(gig);
  } catch (error) {
    console.error("Error fetching gig:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 PUT /api/gigs/:id
 * Update an existing gig by its ID
 */
gigsRouter.put("/:id", async (req, res) => {
  try {
    const updatedGig = await gigModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // ✅ Returns the updated document
    });

    if (!updatedGig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json({
      message: "Gig updated successfully",
      gig: updatedGig,
    });
  } catch (error) {
    console.error("Error updating gig:", error);
    res.status(500).json({ message: "Failed to update gig" });
  }
});

/**
 * 🔹 DELETE /api/gigs/:id
 * Delete a gig by its ID
 */
gigsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedGig = await gigModel.findByIdAndDelete(req.params.id);

    if (!deletedGig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json({
      success: true,
      message: "Gig deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gig:", error);
    res.status(500).json({ message: "Failed to delete gig" });
  }
});

export default gigsRouter;
