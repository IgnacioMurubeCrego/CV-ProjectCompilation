import { DimensionModelType } from "../db/dimension.ts";
import getPeopleFromModel from "./getPeopleFromModel.ts";
import { PlanetModel, PlanetModelType } from "../db/planet.ts";
import { Person, Planet } from "../types.ts";

const getPlanetsFromModel = async (dimension: DimensionModelType): Promise<Planet[]> => {
    
    const planetDocs = await PlanetModel.find({ _id: { $in: dimension.planetIDs } });

    const planetsPromises = planetDocs.map(async (planet: PlanetModelType) => {
        const people: Person[] = await getPeopleFromModel(planet); 
        return {
            id: planet.id.toString(),
            name: planet.name,
            people: people,
        };
    });

    const planets: Planet[] = await Promise.all(planetsPromises); 
    return planets;
};

export default getPlanetsFromModel;
