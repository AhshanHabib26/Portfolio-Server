"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
exports.userValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name is Required" }),
    email: zod_1.z
        .string({ required_error: "Email is Required" })
        .email({ message: "Invalid email format" }),
    password: zod_1.z
        .string({ required_error: "Password is Required" })
        .min(8, { message: "Password must be minimum 8 characters" })
        .max(20, { message: "Password can not be more than 20 characters" }),
});
