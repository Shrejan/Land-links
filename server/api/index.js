import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import connectDB from "../api/db.js";
import Post from "../models/Post.js";
import Account_creation from "../api/routes/ac_creation.js";
import User from "../models/Accounts.js";

const app = express();

const allowedOrigins = ["https://land-links.vercel.app/sell"];

app.use(cors({
  origin: allowedOrigins,  // Allow only the frontend URL
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));


app.options("*", cors());

app.use(express.json());

connectDB(); //mongodb connection

app.use("/ac_creation/api/accounts", Account_creation);


app.post("/api/data", async (req, res) => {
  try {
    
    console.log("Received request body:", req.body);
    const user = await User.findOne({ userId: req.body._id });
    console.log("User found:", user);
    if (!user) return res.status(404).send("User not found");

    const newPost = new Post({
      userId: user,
      full_name: req.body.name,
      contact1: req.body.contact1,
      contact2: req.body.contact2,
      main_loca: req.body.mainLocation,
      exact_loca: req.body.exactLocation,
      price: req.body.price,
      discription: req.body.description,
      //images: [req.body.images],
      g_map_url: req.body.mapLocation,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ messsssssage: error.message });
  }
});

app.get("/api/post", async (req, res) => {
  try {
    const laddlink_data = await Post.find();
    res.json(laddlink_data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default serverless(app);


