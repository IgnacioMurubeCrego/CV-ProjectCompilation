import mongoose from "npm:mongoose@8.0.0";
import { Person } from "../types.ts";

const Schema : typeof mongoose.Schema = mongoose.Schema;

const personSchema = new Schema({
    name : {type : String, required : true},
},
{ timestamps : true },   
);

export type PersonModelType = mongoose.Document & Person;
export const PersonModel = mongoose.model<PersonModelType>("Person",personSchema);