import { ComicModelType } from "../db/comic.ts";
import { ComicModel } from "../db/comic.ts";
import { ComicCollectionModelType } from "../db/comicCollection.ts";
import { Comic, ComicCollection } from "../types.ts";
import { getComicFromModel } from "./getComicFromModel.ts";

export const getComicCollectionFromModel = async (comicCollectionDoc : ComicCollectionModelType): Promise<ComicCollection> => {
    const comicDocs : ComicModelType[] = await ComicModel.find({_id :  {$in : comicCollectionDoc.comics}})
    const comicsInCollection : Comic[] = comicDocs.map((comicDoc : ComicModelType) => getComicFromModel(comicDoc));
    return {
        id: comicCollectionDoc.id.toString(),
        name: comicCollectionDoc.name,
        comics : comicsInCollection
    };
};