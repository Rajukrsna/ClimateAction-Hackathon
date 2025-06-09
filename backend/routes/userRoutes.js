import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, googleId, profilePicture } = req.body;

    if (!email || (!password && !googleId)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      googleId,
      profilePicture: profilePicture||"",
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

/**
 * ✅ User Login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("entered userend", user)
    //console.log("entered Bacend", email)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user || !(await bcrypt.compare(password, user.password)))
    {  console.log("password not matched")
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    if(!token)
      console.log("no token found")
    console.log("token",token)  
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

export default router;