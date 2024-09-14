// @ts-ignore : import error
import { Request, Response } from "npm:express@4.18.2";
import { DiscModel } from "../db/disc.ts";

const updateDisc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, format, art } = req.body;
    if (!name ||  !format || !art) {
      res.status(400).send("Name, format and art are required");
      return;
    }

    const updatedDisc = await DiscModel.findOneAndUpdate(
      { id },
      { name, format, art },
      { new: true }
    ).exec();

    if (!updatedDisc) {
      res.status(404).send("Disc not found");
      return;
    }

    res.status(200).send({
        name: updatedDisc.name,
        author: updatedDisc.author,
        format: updatedDisc.format,
        country : updatedDisc.country,
        art : updatedDisc.art,
        id: updatedDisc._id.toString(),
      });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateDisc;