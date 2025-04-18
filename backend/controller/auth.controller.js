import User from "../model/user.model.js";
import Doctor from "../model/doctor.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/AsyncHandler.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    if ([username, email, password].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    let existingUser = null
    if (role == "user") {
        existingUser = await User.findOne({
          $or: [{ username: username }, { email: email }],
        });
    } else if (role == "doctor") {
        existingUser = await Doctor.findOne({
            $or: [{ name: username }, { email: email }],    
        })
    }

    if (existingUser) {
      throw new ApiError(
        409,
        "Username with this email or username already exists"
      );
    }

    let user = null
    if (role == "user") {
        user = new User({
          username,
          email,
          password,
        });
    } else if(role == "doctor") {
        user = new Doctor({
            name: username,
            email,
            password
        })
    }

    await user.save();
    let createdUser = null

    if (role == "user") createdUser = await User.findById(user._id).select("-password");
    else if (role == "doctor") createdUser = await Doctor.findById(user._id).select("-password")

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering user");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("Error in signup", error.message);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

const generateAccess1Token = async (userId, role, res) => {
  try {
    let user = null
    if (role === "user") user = await User.findById(userId);
    else if (role === "doctor") user = await Doctor.findById(userId);
    const access_token = await user.generateAccessToken();

    await user.save({ validateBeforeSave: false });

    return access_token;
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while generating token"));
  }
};

export const login = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (!password || (!email)) {
      throw new ApiError(
        400,
        "email and password are required"
      );
    }
    let user = null;
    if (role == "user") {
      user = await User.findOne({
        email: email,
      });
    } else if (role == "doctor") {
      user = await Doctor.findOne({
        email: email 
      });
    }

    if (!user) {
        console.log('gg')
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        console.log('hvhjv')
      throw new ApiError(401, "Invalid credentials");
    }

    const token = await generateAccess1Token(user._id, role, res);

    let loggedInUser = null
    if (role == "user") {
        loggedInUser = await User.findById(user._id).select("-password");
    } else if (role == "doctor") {
        loggedInUser = await Doctor.findById(user._id).select("-password")
    }

    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
      .status(201)
      .cookie("token", token, cookieOption)
      .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
  } catch (error) {
    console.log("Error in login", error.message);
    return res.status(401).json(new ApiError(401, error.message));
  }
});

export const logout = asyncHandler(async (req, res) => {
  const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .clearCookie("token", cookieOption)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const google = asyncHandler(async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  if (!name || !email) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const user = await User.findOne({ email }).select("-password");

    if (user) {
      const token = await generateAccess1Token(user?._id);

      if (!user) {
        throw new ApiError(401, "Google auth fail");
      }

      const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      return res
        .status(201)
        .cookie("token", token, cookieOption)
        .json(new ApiResponse(201, user, "Google auth successfull"));
    } else {
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        throw new ApiError(
          409,
          "Username with this email or username already exists"
        );
      }

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: generatePassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = await generateAccess1Token(newUser?._id);

      const loggedInUser = await User.findById(newUser._id).select("-password");

      if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while registering user");
      }

      const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      return res
        .status(201)
        .cookie("token", token, cookieOption)
        .json(new ApiResponse(201, loggedInUser, "Google auth successfull"));
    }
  } catch (error) {
    console.log("Error in google auth", error.message);
    return res.status(401).json(new ApiError(401, error.message));
  }
});
