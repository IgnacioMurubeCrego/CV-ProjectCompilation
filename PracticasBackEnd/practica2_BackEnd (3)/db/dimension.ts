import mongoose from "mongoose";
import { Dimension } from "../types.ts";
import { PlanetModel } from "./planet.ts";

const Schema : typeof mongoose.Schema = mongoose.Schema;

const dimensionSchema = new Schema({
    name : {type : String, required : true},    
    planets : [{type : mongoose.Schema.Types.ObjectId, ref : "Planet"}],
},
{ timestamps : true },   
);

export type DimensionModelType = mongoose.Document & Omit<Dimension, "id" | "planets"> & {
    planetIDs : mongoose.Schema.Types.ObjectId[];
};
export const DimensionModel = mongoose.model<DimensionModelType>("Dimension",dimensionSchema);

