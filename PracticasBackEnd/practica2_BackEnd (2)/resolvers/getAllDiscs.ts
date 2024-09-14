// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { DiscModel, DiscModelType } from "../db/disc.ts";

const getAllDiscs = async (_req : Request, res : Response) => {
    try{
    const someDisc : DiscModelType[] = await DiscModel.find()
    if(someDisc){
        res.status(200).send(someDisc);
    }
    else{
        res.status(404).send("No discs found in database.");
    }
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default getAllDiscs;