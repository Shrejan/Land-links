import mongoose from 'mongoose';
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import connectDB from "../api/db.js";
import Post from "../models/Post.js";
import Account_creation from "./routes/ac_creation.js";
import User from "../models/Accounts.js";

const app = express();

const allowedOrigins = ["https://land-links.vercel.app"];

// Configure CORS properly
app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
//app.options('*', cors());

// Middleware to handle raw body
/*app.use((req, res, next) => {
  let chunks = [];
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks);
    req.rawBody = rawBody.toString();
    next();
  });
});*/

// Ensure the database is connected (only connects if not already connected)
connectDB();

// Middleware to parse JSON bodies
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  },
  limit: '50mb',
  inflate: true,
}));

/*app.use(express.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}));
*/
// Account creation route
app.use("/ac_creation/api/accounts", Account_creation);

// Route to handle data
app.post("/api/data", async (req, res) => {
  console.log("Request received");

  try {
    const newPost = new Post({
      full_name: req.body.name,
      contact1: req.body.contact1,
      contact2: req.body.contact2,
      main_loca: req.body.mainLocation,
      exact_loca: req.body.exactLocation,
      price: req.body.price,
      discription: req.body.description,
      g_map_url: req.body.mapLocation,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: error.message });
  }
});

/*const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});*/

export default serverless(app);