import Group from "../model/group.model.js";
import User from "../model/user.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/AsyncHandler.js";

// export const getUserExpense = asyncHandler(async (req, res) => {
//   const userId = req.params.id;
//   const groupIds = req.query.groupId ? req.query.groupId.split(",") : [];

//   if (!userId) {
//     throw new ApiError(400, "Id required");
//   }

//   try {
//     const userExpense = await User.getOverallExpense(userId, groupIds);

//     if (!userExpense || userExpense.length === 0) {
//       return res.status(200).json(new ApiError(404, "User Expense Not Found"));
//     }

//     let groupDetail = [];
//     let otherGroupExpense = [];

//     if (groupIds?.length > 0) {
//       groupDetail = await Group.getGroupDetail(groupIds);

//       if (!groupDetail || groupDetail?.length === 0) {
//         console.warn(`Group details not found for groupId: ${groupIds}`);
//       }

//       otherGroupExpense = await Expense?.getGroupExpenseNotInUser(
//         userId,
//         groupIds[0]
//       );
//     }

//     const response = {
//       userExpense,
//       ...(groupIds?.length > 0 && {
//         groupDetail,
//       }),
//       ...(otherGroupExpense?.length > 0 && {
//         otherGroupExpense,
//       }),
//     };

//     return res
//       .status(200)
//       .json(
//         new ApiResponse(200, response, "User Expense Retrieved Successfully")
//       );
//   } catch (error) {
//     console.log("Error in getting user expense", error.message);
//     return res.status(500).json(new ApiError(500, error.message));
//   }
// });

export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(" -password ");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, null));
  } catch (error) {
    console.log("Error in getting user details", error.message);
    return res.status(404).json(new ApiError(404, error.message));
  }
});

export const searchUser = asyncHandler(async (req, res) => {
  const query = req.query.query;

  if (!query || query.trim() === "") {
    return res.status(400).json(new ApiError(400, "user name is required"));
  }

  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $ne: req?.user?._id },
    }).select("username _id profilePicture");

    if (users.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, "No user found"));
    }

    res.status(200).json(new ApiResponse(200, users, null));
  } catch (error) {
    console.log("Error in searching user", error.message);
    return res.status(404).json(new ApiError(404, error.message));
  }
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ApiError(400, "User id is required");
  }

  try {
    const userDetail = await User.getUserDetail(userId);
    if (!userDetail) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, userDetail, "User detail Retrieved Successfully")
      );
  } catch (error) {
    console.log("Error in getting user details", error.message);
    return res.status(500).json(new ApiError(500, error.message));
  }
});

export const updateUserData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, address, number, profilePicture } = req.body;

  if (req?.user?._id !== id) {
    throw new ApiError(403, "You are not authorized to update this user");
  }

  try {
    // Validate input fields
    if (username?.length < 4 || username?.length > 20) {
      throw new ApiError(400, "Username must be between 4 and 20 characters");
    }

    if (username?.includes(" ")) {
      throw new ApiError(400, "Username cannot contain spaces");
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      throw new ApiError(400, "Username can only contain letters and numbers");
    }

    if (number && !/^\d{10}$/.test(number)) {
      throw new ApiError(400, "Invalid phone number format");
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== id) {
      throw new ApiError(400, "Username already taken");
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          email,
          address,
          number,
          ...(profilePicture && { profilePicture }),
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(error?.statusCode || 500, error.message));
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    if (req?.params?.id !== req?.user?._id) {
      throw new ApiError(403, "You are not allowed to update this user");
    }

    // if (req.body.password) {
    //   if (req.body.password < 8) {
    //     throw new ApiError(400, "Password must be at least 8 characters long");
    //   }
    // }

    // if (req.body.username) {
    //   if (req.body.username < 4 && req.body.username > 20) {
    //     throw new ApiError(400, "Username must be between 4 and 20 character");
    //   }

    //   if (
    //     typeof req.body.username === "string" &&
    //     req.body.username.includes(" ")
    //   ) {
    //     throw new ApiError("Username cannot contain space");
    //   }

    //   if (!req?.body?.username?.match(/^[a-zA-Z0-9]+$/)) {
    //     throw new ApiError(404, "Username can only contain letter and number");
    //   }

    //   const user = User.findOne({
    //     username: req.body.username,
    //   });

    //   if (user) {
    //     throw new ApiError(400, "Username already exists");
    //   }
    // }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // $set: {
        //   username: req.body.username,
        //   email: req.body.email,
        //   password: req.body.password,
        //   profilePicture: req.body.profilePicture,
        //   coverImage: req.body.coverImage,
        // },
        $set: {
          profilePicture: req?.body?.profilePicture,
        },
      },
      {
        new: true,
      }
    );

    await updatedUser.save();

    const user = await User.findById(req.params.id).select(" -password ");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(201).json(
      new ApiResponse(
        201,
        {
          user,
        },
        "User updated successfully"
      )
    );
  } catch (error) {
    console.log("Error while updating user", error.message);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.user._id !== req.params.id) {
      throw new ApiError(401, "You are not authorized to delete this user");
    }

    if (req.user.expense.length > 0) {
      throw new ApiError(
        400,
        "Account cannot be deleted because you are associated with active expenses."
      );
    }

    // TODO: check in frontend if user is a part of group or not and give popup for confirmation
    if (req.user.group.length > 0) {
      req?.user?.group?.map(async (i) => {
        await Group.findByIdAndUpdate(i, {
          $pull: { memberId: req.user._id },
        });
      });
    }

    await User.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .clearCookie("token")
      .json(201, null, "User has been deleted successfully");
  } catch (error) {
    console.log("Error while deleting user", error.message);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json(
        new ApiResponse(200, null, "User has been logged out successfully")
      );
  } catch (error) {
    console.log("Error while logging out user", error.message);
    return res.status(400).json(new ApiError(400, error.message));
  }
});
