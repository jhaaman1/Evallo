import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import { ContentRoutes } from "./Routes/Content.Routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const  allowedOrigins = process.env.FRONTEND_URL.split(",");
app.use(cors({ origin: allowedOrigins }));

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME,
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});


ContentRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 8800}`
  );
});
