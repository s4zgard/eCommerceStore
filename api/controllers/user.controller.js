import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signIn = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const yes = await user.matchPassword(req.body.password, user.password);
  if (user && yes) {
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "dev",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const register = asyncHandler((req, res) => {
  res.send("register user");
});

export const signOut = asyncHandler((req, res) => {
  res.send("sign out user");
});

export const getUserProfile = asyncHandler((req, res) => {
  res.send("get user profile");
});

export const updateUserProfile = asyncHandler((req, res) => {
  res.send("update user profile");
});

export const getUserById = asyncHandler((req, res) => {
  res.send("get user by id");
});

export const getAllUsers = asyncHandler((req, res) => {
  res.send("get all users");
});

export const deleteUser = asyncHandler((req, res) => {
  res.send("delete user");
});

export const updateUserById = asyncHandler((req, res) => {
  res.send("update user");
});
