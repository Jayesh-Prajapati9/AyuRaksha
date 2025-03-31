import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "../util/ApiError.js";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    number: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=360",
    },
    group: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    friend: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    doctor: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      profilePicture: this.profilePicture,
      address: this.address,
      number: this.number,
      createdAt: this.createdAt.toISOString(),
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
