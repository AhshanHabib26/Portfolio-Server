import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Experience } from "./experience.model";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await Experience.create(req.body);

  res.status(201).json({
    success: true,
    message: "Experience created successfully!",
    data: result,
  });
});

const getAllExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await Experience.find({ isDeleted: { $ne: true } }).sort({
    createdAt: -1,
  });
  res.status(201).json({
    success: true,
    message: "All Experience retrive successfully!",
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Experience.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Experience not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Single Experience retrived successfully!",
    data: result,
  });
});

const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Experience.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Experience updated successfully!",
    data: result,
  });
};

const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Experience.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Experience not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Experience deleted successfully!",
    data: null,
  });
};

export const experienceController = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
