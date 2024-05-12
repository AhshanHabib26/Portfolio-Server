"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const user_router_1 = __importDefault(require("./user/user.router"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Welcome to M A AHSHAN HABIB World!");
});
app.use("/api/auth", user_router_1.default);
// Global Error Handler
app.use(errorHandler_1.default);
exports.default = app;
