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

const router = express.Router();

router.post("/signin", signIn);
router.post("/register", register);
router.post("/signout", signOut);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUserById);
router.get("/", getAllUsers);

export default router;
