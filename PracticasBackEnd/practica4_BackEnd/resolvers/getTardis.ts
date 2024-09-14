// @ts-ignore: import error
import { Request, Response } from "npm:express@4.18.2";
import { TardisModel } from "../db/tardis.ts";  
import { PersonModel } from "../db/person.ts";
import { DimensionModel } from "../db/dimension.ts";
import { PlanetModel } from "../db/planet.ts";
import { getTardisFromModel } from "../controllers/getTardisFromModel.ts";

const getTardis = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const tardisModel = await TardisModel.findById({_id : id});
      
        if (tardisModel) {
            const tardis = await getTardisFromModel(tardisModel);
            res.status(200).send(tardis);
        } else {
            res.status(404)
                .send(`No tardis with MongoID ${id} found in database.`);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}

export default getTardis;
