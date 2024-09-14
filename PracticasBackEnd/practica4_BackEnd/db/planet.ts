import mongoose from "npm:mongoose@8.0.0";
import { Planet } from "../types.ts";
import { PersonModel } from "./person.ts";

const Schema : typeof mongoose.Schema = mongoose.Schema;

const planetSchema = new Schema({
    name : {type : String, required : true},
    people : [{type : mongoose.Schema.Types.ObjectId, ref : "Person", required : true}]
},
{ timestamps : true },   
);

export type PlanetModelType = mongoose.Document & Omit<Planet, "id" | "people"> & {
    peopleIDs : mongoose.Schema.Types.ObjectId
};
export const PlanetModel = mongoose.model<PlanetModelType>("Planet",planetSchema);