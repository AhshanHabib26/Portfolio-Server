import express from "express";
import { experienceController } from "./experience.controller";
const router = express.Router();

router.post("/", experienceController.createExperience);
router.get("/", experienceController.getAllExperience);
router.get("/:id", experienceController.getSingleExperience);
router.put("/:id", experienceController.updateExperience);
router.delete("/:id", experienceController.deleteExperience);

export default router;
