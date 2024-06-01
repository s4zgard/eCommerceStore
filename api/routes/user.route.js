import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  register,
  signIn,
  signOut,
  updateUserById,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/register", register);
router.post("/signout", signOut);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);
router.get("/", protect, admin, getAllUsers);

export default router;
