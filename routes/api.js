import express from "express";
import { registerUser, loginUser } from "../../controllers/UsersController.js";

import {
  registerUser,
  loginUser,
  getProfile,
  getAllProfiles,
  updateProfile,
  deleteUser,
} from "../controllers/UsersController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.get("/all-profiles", getAllProfiles);
router.put("/update/:id", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
