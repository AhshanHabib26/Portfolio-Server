/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { Request, Response } from "express";
import { createUserService, loginUserService } from "./user.services";
import catchAsync from "../utils/catchAsync";
import { userValidation } from "./user.validation";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body
    const validationData = userValidation.parse(userData)
    const result = await createUserService(validationData)
  
  res.status(200).json({
    success: true,
    message: "User Created Successfully",
    data: null,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUserService(req.body);

  res.status(200).json({
    success: true,
    message: "User Login Successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
};
