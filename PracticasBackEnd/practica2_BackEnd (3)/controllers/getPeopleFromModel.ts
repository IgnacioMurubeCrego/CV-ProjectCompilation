import { PersonModel, PersonModelType } from "../db/person.ts";
import { PlanetModelType } from "../db/planet.ts";
import { Person } from "../types.ts";

const getPeopleFromModel = async (planet : PlanetModelType) : Promise<Person[]> => {
    try{
    const people = await PersonModel.find({ _id : {$in : planet.peopleIDs}});
            people.map((person : PersonModelType) => ({
                id : person.id.toString(),
                name : person.name
            }))
    return people;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export default getPeopleFromModel;