import mongoose from "mongoose";
import { ComicCollection } from "../types.ts";
const Schema = mongoose.Schema;

const ComicCollectionSchema = new Schema({
    name : {type : String , required : true},
    comics : { type : [mongoose.Types.ObjectId], required : true, ref : "Comic"},

})

export type ComicCollectionModelType = mongoose.Document & Omit<ComicCollection, "id" | "comics"> &
                        {comics : [mongoose.Types.ObjectId]};
export const ComicCollectionModel = mongoose.model<ComicCollectionModelType>(
    "ComicCollection",
    ComicCollectionSchema
);  