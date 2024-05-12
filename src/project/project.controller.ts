import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Project } from "./project.model";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await Project.create(req.body);

  res.status(201).json({
    success: true,
    message: "Project created successfully!",
    data: result,
  });
});

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await Project.find({ isDeleted: { $ne: true } }).sort({
    createdAt: -1,
  });
  res.status(201).json({
    success: true,
    message: "All Project retrive successfully!",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Project.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Project not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Single Project retrived successfully!",
    data: result,
  });
});

const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Project.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Project updated successfully!",
    data: result,
  });
};

const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Project.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Project not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully!",
    data: null,
  });
};

export const projectController = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
