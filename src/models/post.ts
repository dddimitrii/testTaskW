import { Document, Model, Schema, model } from "mongoose";

export interface Post {
  ownerId: string;
  postMessage: string;
  created: Date;
  images: object[];
}

export interface PostDoc extends Post, Document {}

export interface PostModel extends Model<PostDoc> {}

const PostSchema = new Schema<PostDoc, PostModel>({
  ownerId: { type: String, required: true },
  postMessage: { type: String },
  created: { type: Date },
  images: [{ type: Object }],
});

export default model<PostDoc, PostModel>("Post", PostSchema);
