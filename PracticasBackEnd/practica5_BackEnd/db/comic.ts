import mongoose from "mongoose";
import { Comic } from "../types.ts";
const Schema = mongoose.Schema; 

const ComicSchema = new Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    format : {type : String, required : true} 
});

export type ComicModelType = mongoose.Document & Omit<Comic, "id">;
export const ComicModel = mongoose.model<ComicModelType>(
    "Comic",
    ComicSchema
)