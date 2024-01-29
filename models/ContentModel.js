import mongoose from "mongoose";

export const Content = mongoose.model(
  "Content",
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    mockFileLink: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 255,
    },
    category: { type: String, required: true },
    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    targetAudience: { type: String, enum: ["Students", "Teachers", "Parents"] },
    date: {type: Date}
  }),
  "Content"
);
