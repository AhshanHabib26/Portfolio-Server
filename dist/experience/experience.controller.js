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
exports.experienceController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const experience_model_1 = require("./experience.model");
const createExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.create(req.body);
    res.status(201).json({
        success: true,
        message: "Experience created successfully!",
        data: result,
    });
}));
const getAllExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.find({ isDeleted: { $ne: true } }).sort({
        createdAt: -1,
    });
    res.status(201).json({
        success: true,
        message: "All Experience retrive successfully!",
        data: result,
    });
}));
const getSingleExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield experience_model_1.Experience.findOne({
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
}));
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield experience_model_1.Experience.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    });
    res.status(200).json({
        success: true,
        message: "Experience updated successfully!",
        data: result,
    });
});
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield experience_model_1.Experience.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
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
});
exports.experienceController = {
    createExperience,
    getAllExperience,
    getSingleExperience,
    updateExperience,
    deleteExperience,
};
