"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const user_router_1 = __importDefault(require("./user/user.router"));
const experience_router_1 = __importDefault(require("./experience/experience.router"));
const skills_router_1 = __importDefault(require("./skills/skills.router"));
const project_router_1 = __importDefault(require("./project/project.router"));
const blog_router_1 = __importDefault(require("./blog/blog.router"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application API
app.use("/api/auth", user_router_1.default);
app.use("/api/experience", experience_router_1.default);
app.use("/api/skill", skills_router_1.default);
app.use("/api/project", project_router_1.default);
app.use("/api/blog", blog_router_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to M A AHSHAN HABIB World!");
});
// Global Error Handler
app.use(errorHandler_1.default);
exports.default = app;
