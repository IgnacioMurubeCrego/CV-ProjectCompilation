import { DimensionModelType } from "../db/dimension.ts";
import { DimensionModel } from "../db/dimension.ts";
import { TardisModelType } from "../db/tardis.ts";
import { Dimension, Planet, Tardis } from "../types.ts";
import getPlanetsFromModel from "./getPlanetsFromModel.ts";

export const getTardisFromModel = async (tardis:TardisModelType) : Promise<Tardis> => {
    
    const{_id,dimensionIDs,camouflage,regenerationNumber,currentYear} = tardis;

    const dimensionsDocs = await DimensionModel.find({ _id: { $in: dimensionIDs } });

    const dimensionsPromises = dimensionsDocs.map(async (dimension : DimensionModelType) => {
        const planets : Planet[] = await getPlanetsFromModel(dimension);
        return ({
        id : dimension.id,
        name : dimension.name,
        planets : planets,
    })});

    const dimensions : Dimension[] = await Promise.all(dimensionsPromises);

    return {
        id : _id.toString(),
        camouflage : camouflage,    
        regenerationNumber : regenerationNumber,
        currentYear : currentYear,
        dimensions : dimensions,
    };
}