import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Blog } from "./blog.model";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    message: "Blog created successfully!",
    data: result,
  });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await Blog.find({ isDeleted: { $ne: true } }).sort({
    createdAt: -1,
  });
  res.status(201).json({
    success: true,
    message: "All Blog retrive successfully!",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Blog.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Blog not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Single Blog retrived successfully!",
    data: result,
  });
});

const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Blog.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Blog updated successfully!",
    data: result,
  });
};

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Blog.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Blog not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully!",
    data: null,
  });
};

export const blogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
