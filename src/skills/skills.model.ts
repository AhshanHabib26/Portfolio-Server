import { Schema, model } from "mongoose";
import { TSkills } from "./skills.interface";

const skillsSchema = new Schema<TSkills>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Skill = model<TSkills>("Skill", skillsSchema);
