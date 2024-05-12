import express from "express";
import { skillsController } from "./skills.controller";
const router = express.Router();

router.post("/", skillsController.createSkill);
router.get("/", skillsController.getAllSkills);
router.get("/:id", skillsController.getSingleSkill);
router.put("/:id", skillsController.updateSkill);
router.delete("/:id", skillsController.deleteSkill);

export default router;
