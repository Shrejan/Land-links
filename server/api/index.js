import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import connectDB from "../api/db.js";
import Post from "../models/Post.js";
import Account_creation from "../api/routes/ac_creation.js";
import User from "../models/Accounts.js";

const app = express();
app.use(express.json());
const allowedOrigins = ['https://land-links.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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



export default serverless(app);


