
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/UsersModel.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      NIDNumber,
      phoneNumber,
      password: hashedPassword,
      bloodGroup,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful!", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
