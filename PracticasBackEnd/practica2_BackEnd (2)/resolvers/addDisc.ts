// @ts-ignore : import error
import { Request, Response } from "npm:express@4.18.2";
import { DiscModel } from "../db/disc.ts";
const addDisc = async (req: Request, res: Response) => {
  try {
    const { name, author, format, country, art } = req.body;
    if (!name || !author || !format || !country || !art) {
      res.status(400).send("Name, author, format, country and art are required");
      return;
    }

    const alreadyExists = await DiscModel.findOne({ 
      name: req.params.name,
      author : req.params.author,
      format : req.params.format,
      country : req.params.country,
      art : req.params.art
      }).exec();

    if (alreadyExists) {
      res.status(400).send("Disc already exists.");
      return;
    }

    const newDisc = new DiscModel({ name, author, format, country, art });
    await newDisc.save();

    res.status(200).send({
      name: newDisc.name,
      author: newDisc.author,
      format: newDisc.format,
      country : newDisc.country,
      art : newDisc.art,
      id: newDisc._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addDisc;