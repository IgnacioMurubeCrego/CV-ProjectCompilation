import { ComicCollectionModel, ComicCollectionModelType } from "../db/comicCollection.ts";
import { GraphQLError } from "graphql";
import { UserModelType } from "../db/user.ts";
import { getComicCollectionFromModel } from "../controllers/getComicCollectionFromModel.ts";
import { ComicCollection } from "../types.ts";
import mongoose from "mongoose";

export const User = {
    collection: async (parent: UserModelType): Promise<ComicCollection> => {
        try {
            const collectionId : mongoose.Types.ObjectId = parent.collection;
            const comicCollectionDoc : ComicCollectionModelType | null = await ComicCollectionModel.findById(collectionId);
            if (!comicCollectionDoc) {
                throw new GraphQLError("No collection found");
            }
            return getComicCollectionFromModel(comicCollectionDoc);
        } catch (error) {
            throw new GraphQLError(error.message);
        }
    }
};
