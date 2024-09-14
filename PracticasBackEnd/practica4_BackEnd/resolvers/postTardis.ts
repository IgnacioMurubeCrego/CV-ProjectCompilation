// @ts-ignore : npm Request,Response import error.
import {Request, Response } from "npm:express@4.18.2";
import { TardisModel } from "../db/tardis.ts";

const postTardis = async (req : Request, res : Response) => {
    try {
        const newTardis = await TardisModel.create(req.body);
        res.status(200).send(newTardis);
    } catch (error) {
        console.log(error);
    }
}

export default postTardis;