import { Request, Response } from "express";
import Post from "../models/post";

class PostController {
  async create(req: Request, res: Response) {
    const { postMessage } = req.body;
    try {
      const post = await Post.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ownerId: req.user.id,
        postMessage,
        created: Date.now(),
        images: req.files,
      });

      res.send(post);
    } catch (e) {
      res.sendStatus;
    }
  }

  async update(req: Request, res: Response) {
    const { postId, postMessage } = req.body;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        res.status(204);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (req.user.id !== post.ownerId) {
        return res.status(403).json({ message: "Нет прав доступа" });
      }
      await Post.findByIdAndUpdate(postId, {
        postMessage,
        images: req.files,
      });

      res.status(200).json({ message: "успешно обновлено" });
    } catch (e) {
      res.sendStatus;
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        res.status(204);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (req.user.id !== post.ownerId) {
        return res.status(403).json({ message: "Нет прав доступа" });
      }
      await Post.deleteOne({ _id: id });
      res.status(200).json({ message: "Успешно удалено" });
    } catch (e) {
      res.sendStatus;
    }
  }

  async getAll(req: Request, res: Response) {
    const { page = 1 } = req.query;
    try {
      const posts = await Post.find()
        .limit(20 * 1)
        .skip((+page - 1) * 20);
      res.status(200).json({ posts });
    } catch (e) {
      res.sendStatus;
    }
  }
}

export default new PostController();
