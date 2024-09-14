// @ts-ignore: import error
import { Request, Response } from "npm:express@4.18.2";
import { TardisModel } from "../db/tardis.ts";
import { DimensionModel } from "../db/dimension.ts";
import { PlanetModel } from "../db/planet.ts";
import { PersonModel } from "../db/person.ts";

const updateTardis = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        let updatedObject;

        if ("dimensions" in updateData) {
            updatedObject = await TardisModel.findByIdAndUpdate(id, updateData, { new: true });
        } 
        else if ("planets" in updateData) {
            updatedObject = await DimensionModel.findByIdAndUpdate(id, updateData, { new: true });
        } 
        else if ("people" in updateData) {
            updatedObject = await PlanetModel.findByIdAndUpdate(id, updateData, { new: true });
        } 
        else if ("name" in updateData) {
            updatedObject = await PersonModel.findByIdAndUpdate(id, updateData, { new: true });
        } 
        else {
            res.status(400).send('Invalid request body.');
            return;
        }

        if (updatedObject) {
            res.status(200).send(updatedObject);
        } else {
            res.status(404).send(`No object with MongoID ${id} found in database.`);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}

export default updateTardis;
