import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signIn = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // No user found with the provided email
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Check if the password matches
  const isMatch = await user.matchPassword(req.body.password);

  if (isMatch) {
    // Password is correct, generate token and send response
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Password doesn't match
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const find = await User.findOne({ email });
  if (find) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (!find) {
    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  }
});

export const signOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Sign out successful." });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found.");
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found.");
  }
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
