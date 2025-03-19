import mongoose from "mongoose";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
//import connectDB from "../api/db.js";
//import Post from "./models/Post.js";
//import Account_creation from "./routes/ac_creation.js";
//import User from "../models/Accounts.js";

const app = express();

const allowedOrigins = ["https://land-links.vercel.app/"];

// Configure CORS properly
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  })
);

//connectDB();

// Middleware to parse JSON bodies
app.use(
  express.json({
    limit:"25mb"
  })
);



// Account creation route
//app.use("/ac_creation/api/accounts", Account_creation);

// Route to handle data
app.post("/data", async(req, res) => {
  console.log('Running on Vercel:', process.env.VERCEL);

  try {
    const newPost = new Post({
      name: req.body.name,
      /*contact1: req.body.contact1,
      contact2: req.body.contact2,
      main_loca: req.body.mainLocation,
      exact_loca: req.body.exactLocation,
      price: req.body.price,
      discription: req.body.description,
      g_map_url: req.body.mapLocation,*/
    });
    //const savedPost = await newPost.save();
    // res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: error.message });
  }
});


/*app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});*/

export default serverless(app);
