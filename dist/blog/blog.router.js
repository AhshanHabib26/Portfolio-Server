"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post("/", blog_controller_1.blogController.createBlog);
router.get("/", blog_controller_1.blogController.getAllBlog);
router.get("/:id", blog_controller_1.blogController.getSingleBlog);
router.put("/:id", blog_controller_1.blogController.updateBlog);
router.delete("/:id", blog_controller_1.blogController.deleteBlog);
exports.default = router;
