import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Skill } from "./skills.model";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await Skill.create(req.body);

  res.status(201).json({
    success: true,
    message: "Skill created successfully!",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await Skill.find({ isDeleted: { $ne: true } }).sort({
    createdAt: -1,
  });
  res.status(201).json({
    success: true,
    message: "All Skills retrive successfully!",
    data: result,
  });
});

const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Skill.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Skill not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Single Skill retrived successfully!",
    data: result,
  });
});

const updateSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Skill.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Skill updated successfully!",
    data: result,
  });
};

const deleteSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Skill.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Skill not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully!",
    data: null,
  });
};

export const skillsController = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  deleteSkill,
  updateSkill,
};
