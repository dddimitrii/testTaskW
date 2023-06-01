import { Router } from "express";
import PostController from "../controllers/postController";
import { upload } from "../middlewares/upload";
import { checkAuth } from "../middlewares/checkAuth";

const PostRouter = Router();

PostRouter.post(
  "/",
  checkAuth,
  upload.array("files", 3),
  PostController.create
);
PostRouter.put("/", checkAuth, upload.array("files", 3), PostController.update);
PostRouter.delete("/:id", checkAuth, PostController.delete);
PostRouter.get("/", PostController.getAll);

export { PostRouter };
