import mongoose from 'mongoose';
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import Post from "../models/Post.js";
import Account_creation from "./routes/ac_creation.js";
import User from "../models/Accounts.js";
import dotenv from 'dotenv';dotenv.config();

const app = express();


const allowedOrigins = ["https://land-links.vercel.app"];

// Configure CORS properly
app.use(cors({
  origin: 'https://land-links.vercel.app',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

/*const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection error:', error.message);
    process.exit(1);
  }
};*/
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ✅ Fix: Ensure MongoDB connection

/*connectDB()
.then(() => console.log('MongooooooDB connected'))
.catch((err) => console.error('MongooooooooDB connection error:', err));
*/


// Account creation route
app.use("/ac_creation/api/accounts", Account_creation);

// ✅ Fix: Correct User lookup and Post creation
app.post("/api/data", async (req, res) => {
  try {
    /*console.log("Received request body:", req.body);

    // Correct lookup using _id instead of userId
    const user = await User.findOne({ _id: req.body._id });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }*/

    // Create and save new post
    const newPost = new Post({
     /* userId: user._id,*/ // Fix: Store only the user ID
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


export default serverless(app);
