import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      console.log("invalid email or password");
      return res.status(401).json({ message: "Incorrect password or email" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      token,
      user: { _id: user._id, username: user.username, email: user.email },
      userId: user._id,
      message: "logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
}

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password, "hahaha backend regis");

    const getEmail = await User.findOne({ email });

    if (getEmail) {
      return res.status(400).json({ message: "email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      token,
      user: { _id: user.id, username: user.username, email: user.email },
      userId: user._id,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("no results");
  }
}
