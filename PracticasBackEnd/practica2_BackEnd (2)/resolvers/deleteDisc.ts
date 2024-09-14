// @ts-ignore : import error
import { Request, Response } from "npm:express@4.18.2";
import { DiscModel } from "../db/disc.ts";

const deleteDisc = async (req: Request, res: Response) => {
  try {
    const { MongoID } = req.params;
    const disc = await DiscModel.findOneAndDelete({ MongoID }).exec();
    if (!disc) {
      res.status(404).send("Disc not found");
      return;
    }
    res.status(200).send("Disc deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteDisc;