import express from "express";
import cors from "cors";
import connectDB from "../db.js";
import User from "../models/Accounts.js";
const Account_creation = express.Router();

Account_creation.use(cors());
Account_creation.use(express.json());

connectDB();

Account_creation.post("/", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      user_id: req.body.userId,
      password: req.body.password,
    });
    const saveduser = await newUser
      .save()
      .then(() => console.log("User saved"))
      .catch((err) => console.error(err));
    res.status(201).json(saveduser);
  } catch (error) {
    res.status(500).json({ messsssssage: error.message });
  }

});
export default Account_creation;
