"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experience_controller_1 = require("./experience.controller");
const router = express_1.default.Router();
router.post("/", experience_controller_1.experienceController.createExperience);
router.get("/", experience_controller_1.experienceController.getAllExperience);
router.get("/:id", experience_controller_1.experienceController.getSingleExperience);
router.put("/:id", experience_controller_1.experienceController.updateExperience);
router.delete("/:id", experience_controller_1.experienceController.deleteExperience);
exports.default = router;
