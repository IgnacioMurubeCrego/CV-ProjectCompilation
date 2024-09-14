// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { DiscModel, DiscModelType } from "../db/disc.ts";

const getDiscsByCountry = async (req : Request, res : Response) => {
    try{
    const {country} = req.params;
    const searchedDiscs : DiscModelType[] | null = await DiscModel.find({country}).exec();
    if(searchedDiscs){
        res.status(200).send(searchedDiscs);
    }
    else{
        res.status(404).send("No Discs from:"+country+" found in database.");
    }
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
}
export default getDiscsByCountry;