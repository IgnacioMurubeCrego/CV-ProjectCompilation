import mongoose from "mongoose";
import { User } from "../types.ts";
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    name : {type : String, required : true},
    mail : {type : String, required : true},
    collection : { type : mongoose.Types.ObjectId, required : true, ref : "ComicCollection"}
});

export type UserModelType = mongoose.Document & Omit<User, "id" | "collection"> & {collection : mongoose.Types.ObjectId, ref : "ComicCollection"};
export const UserModel = mongoose.model<UserModelType>(
    "User",
    UserSchema
)