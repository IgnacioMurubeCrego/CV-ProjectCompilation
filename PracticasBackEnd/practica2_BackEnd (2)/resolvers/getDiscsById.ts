// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { DiscModel, DiscModelType } from "../db/disc.ts";

const getDiscsById = async (req : Request, res : Response) => {
    try{
    const {id} = req.params;
    const searchedDisc : DiscModelType | null = await DiscModel.findOne({id}).exec();
    if(searchedDisc){
        res.status(200).send(searchedDisc);
    }
    else{
        res.status(404).send("Disc with id:"+id+" not found in database.");
    }
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default getDiscsById;