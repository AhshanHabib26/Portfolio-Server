"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const project_model_1 = require("./project.model");
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.create(req.body);
    res.status(201).json({
        success: true,
        message: "Project created successfully!",
        data: result,
    });
}));
const getAllProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.find({ isDeleted: { $ne: true } }).sort({
        createdAt: -1,
    });
    res.status(201).json({
        success: true,
        message: "All Project retrive successfully!",
        data: result,
    });
}));
const getSingleProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield project_model_1.Project.findOne({
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
}));
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield project_model_1.Project.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    });
    res.status(200).json({
        success: true,
        message: "Project updated successfully!",
        data: result,
    });
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield project_model_1.Project.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
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
});
exports.projectController = {
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject,
};
