import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import connectDB from "../api/db.js";
import Post from "../models/Post.js";
import Account_creation from "../api/routes/ac_creation.js";
import User from "../models/Accounts.js";

const app = express();

// ✅ Fix: Proper CORS handling
app.use(cors({
  origin: 'https://land-links.vercel.app', // Replace with frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Fix: Handle OPTIONS requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://land-links.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  next();
});

// ✅ Fix: Ensure MongoDB connection
connectDB();

// Account creation route
app.use("/ac_creation/api/accounts", Account_creation);

// ✅ Fix: Correct User lookup and Post creation
app.post("/api/data", async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    // Correct lookup using _id instead of userId
    const user = await User.findOne({ _id: req.body._id });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save new post
    const newPost = new Post({
      userId: user._id, // Fix: Store only the user ID
      full_name: req.body.name,
      contact1: req.body.contact1,
      contact2: req.body.contact2,
      main_loca: req.body.mainLocation,
      exact_loca: req.body.exactLocation,
      price: req.body.price,
      discription: req.body.description,
      // images: req.body.images, // Uncomment if needed
      g_map_url: req.body.mapLocation,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Fix: Export as Serverless function for Vercel
export default serverless(app);
