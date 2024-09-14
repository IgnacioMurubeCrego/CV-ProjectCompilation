import mongoose from "npm:mongoose@7.6.3";
import { Disc } from "../types.ts";
import { FORMAT } from "../types.ts";

const Schema = mongoose.Schema;

const discSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true, unique : false},
    format: { type: String, enum : FORMAT, required: true },
    matrix: {type : Array, required : false},
    country: {type : String, required : true},
    art: {type : String, required : true},
  },
  { timestamps: true }
);

export type DiscModelType = mongoose.Document & Omit<Disc, "id">;

export const DiscModel =  mongoose.model<DiscModelType>("Disc", discSchema);