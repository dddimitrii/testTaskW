require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { AuthRouter } from "./src/routes/authRouter";
import { PostRouter } from "./src/routes/postRouter";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);
app.use("/posts", PostRouter);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
