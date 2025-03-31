import { errorHandler } from "../util/error.js";
import Post from "../model/post.model.js";

import Blog from "../model/blog.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/AsyncHandler.js";

const validateBlogData = (data) => {
  const { userId, title, content, slug } = data;
  if (!userId || !title || !content || !slug) {
    throw new ApiError(
      400,
      "All required fields (userId, title, content, slug) must be provided"
    );
  }
};

export const createBlog = asyncHandler(async (req, res) => {
  try {
    validateBlogData(req.body);
    if (!req?.body?.title || !req?.body?.content) {
      throw new ApiError(
        400,
        "All required fields (title, content) must be provided"
      );
    }

    const slug = req?.body?.title
      ?.split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const blog = new Blog({
      ...req.body,
      userId: req.user.id,
      slug,
    });

    await blog.save();

    res
      .status(201)
      .json(new ApiResponse(201, blog, "Blog created successfully"));
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getBlog = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex || 0);
    const limit = parseInt(req.query.limit || 9);
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const post = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: {
              $regex: req.query.searchTerm,
              $options: "i",
            },
          },
          {
            content: {
              $regex: req.query.searchTerm,
              $options: "i",
            },
          },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPost = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPost = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      post,
      totalPost,
      lastMonthPost,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin || req.params.userId !== req.user.id) {
    return next(
      errorHandler(401, "You are not authorized to update this post")
    );
  }

  try {
    const updatePost1 = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      {
        new: true,
      }
    );
    if (!updatePost1) throw new ApiError(404, "Blog not found");
    res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog updated successfully"));
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const blog = await Blog.findOneAndDelete({ _id: postId, userId });
    if (!blog) throw new ApiError(404, "Blog not found");

    res
      .status(200)
      .json(new ApiResponse(200, null, "Blog deleted successfully"));
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});
