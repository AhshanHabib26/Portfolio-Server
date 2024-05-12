import { USER_ROLE } from "./user.constants";

export type TUserType = {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role?: "user" | "admin";
  status?: "active" | "blocked";
  isDeleted?: boolean;
};

export type TUserRole = keyof typeof USER_ROLE