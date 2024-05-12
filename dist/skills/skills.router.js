"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skills_controller_1 = require("./skills.controller");
const router = express_1.default.Router();
router.post("/", skills_controller_1.skillsController.createSkill);
router.get("/", skills_controller_1.skillsController.getAllSkills);
router.get("/:id", skills_controller_1.skillsController.getSingleSkill);
router.put("/:id", skills_controller_1.skillsController.updateSkill);
router.delete("/:id", skills_controller_1.skillsController.deleteSkill);
exports.default = router;
