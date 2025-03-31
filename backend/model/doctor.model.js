import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
    specialization: [
      {
        type: String,
      },
    ],
    hospital: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
      },
    ],
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    degree: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

doctorSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.name,
      email: this.email,
      profilePicture: this.profilePicture,
      createdAt: this.createdAt.toISOString(),
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
