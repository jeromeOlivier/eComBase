import asyncUserHandler from "../middleware/async-handler";
import { UserModel } from "../models/user-model";
import generateToken from "../utils/genetate-token";
import { ExtendedRequest, ExtendedResponse } from "../types/global";

// USER ROUTES

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncUserHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
);

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncUserHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    const { name, email, password } = req.body;
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await UserModel.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
    res.send("user registers");
  }
);

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncUserHandler(
  async (_req: ExtendedRequest, res: ExtendedResponse) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "logged out" });
  }
);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncUserHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");
    const user = await UserModel.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncUserHandler(
  async (req: any, res: ExtendedResponse) => {
    const user = await UserModel.findById(req.user._id);
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
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// ADMIN ROUTES

// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncUserHandler(
  async (_req: ExtendedRequest, res: ExtendedResponse) => {
    res.send("admin get all users");
  }
);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncUserHandler(
  async (_req: ExtendedRequest, res: ExtendedResponse) => {
    res.send("admin gets a user by their id");
  }
);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncUserHandler(
  async (_req: ExtendedRequest, res: ExtendedResponse) => {
    res.send("admin deletes a user by their id");
  }
);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncUserHandler(
  async (_req: ExtendedRequest, res: ExtendedResponse) => {
    res.send("admin updates a user by their id");
  }
);

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
