import mongoose from "npm:mongoose@8.0.0";
import { Tardis } from "../types.ts";
import { DimensionModel } from "./dimension.ts";

const Schema: typeof mongoose.Schema = mongoose.Schema;

const tardisSchema = new Schema({
    dimensionIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dimension" }],
    planetIDs : [{ type : mongoose.Schema.Types.ObjectId, ref : "Planet"}],
    peopleIDs : [{ type : mongoose.Schema.Types.ObjectId, ref : "Person"}],
    camouflage: { type: String, required: true },
    regenerationNumber: { type: Number, required: true },
    currentYear: { type: Number, required: true }
}, { timestamps: true });

export type TardisModelType = mongoose.Document 
& Omit<Tardis, "id" | "dimensions" | "planets" | "people"> & {
    dimensionIDs : mongoose.Schema.Types.ObjectId[];
    planetIDs : mongoose.Schema.Types.ObjectId[];
    peopleIDs : mongoose.Schema.Types.ObjectId[];
};

export const TardisModel = mongoose.model<TardisModelType>("Tardis", tardisSchema);
