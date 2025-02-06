import serverless from 'serverless-http';
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import Post from "../modles/Post.js";
import Account_creation from "./ac_creation.js";
import User from "../modles/Accounts.js"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectDB(); //mongodb connection

app.use("https://land-links-backend.vercel.app//ac_creation/api/accounts",Account_creation);



app.post("https://land-links-backend.vercel.app/api/data", async (req, res) => {
  
  
  try {  /*const user = await User.findOne({userId: req.body.user_id});
  if (!user) return res.status(404).send("User not found");*/
  console.log("Received request body:", req.body);
const user = await User.findOne({ userId : req.body._id });
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

app.get("/api/pos", async (req, res) => {
  try {
    const laddlink_data = await Post.find();
    res.json(laddlink_data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(port, () => console.log(`Server running on port ${port}`))
export default serverless(app);