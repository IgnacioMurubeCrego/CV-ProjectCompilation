import { ComicModelType } from "../db/comic.ts";
import { Comic } from "../types.ts";

export const getComicFromModel = (comicDoc : ComicModelType ) : Comic => {
    const comic : Comic = {
        "id" : comicDoc.id.toString(),
        "title" : comicDoc.title,
        "description" : comicDoc.description,
        "format" : comicDoc.format
    } 
    return comic;
}