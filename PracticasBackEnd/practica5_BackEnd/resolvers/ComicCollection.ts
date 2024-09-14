import { getComicFromModel } from "../controllers/getComicFromModel.ts";
import { ComicModel } from "../db/comic.ts";
import { ComicCollectionModelType } from "../db/comicCollection.ts";
import { GraphQLError } from "graphql";
import { Comic } from "../types.ts";

export const ComicCollection = {
    comics : async (parent : ComicCollectionModelType) : Promise<Comic[]>  => {
        const comicIds = parent.comics.map((comic) => comic.id);
        const comicDocs = await ComicModel.find({ _id : { $in : comicIds}});
        if(!comicDocs){
            throw new GraphQLError("No comics from collection found"); 
        }
        return comicDocs.map((comicDoc) => getComicFromModel(comicDoc));
    }
}