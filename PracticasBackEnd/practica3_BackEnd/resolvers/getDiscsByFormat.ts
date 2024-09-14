// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { DiscModel, DiscModelType } from "../db/disc.ts";

const getDiscsByFormat = async (req : Request, res : Response) => {
    try{
    const {format} = req.params;
    const searchedDiscs : DiscModelType[] | null = await DiscModel.find({format}).exec();
    if(searchedDiscs){
        res.status(200).send(searchedDiscs);
    }
    else{
        res.status(404).send("No Discs with format:"+format+" found in database.");
    }
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default getDiscsByFormat;