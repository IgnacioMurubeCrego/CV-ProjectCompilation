import { GraphQLError } from "graphql";
import { UserModel, UserModelType } from "../db/user.ts";
import { ComicModel,ComicModelType } from "../db/comic.ts";
import { ComicCollectionModel,ComicCollectionModelType } from "../db/comicCollection.ts";

export const Query = {
    users : async () : Promise<UserModelType[]> => {
        const users = await UserModel.find().exec();
        return users;
    },

    user : async (_: unknown, args : {id : string}) : Promise<UserModelType> => {
        const user = await  UserModel.findById(args.id);
        if(!user){
            throw new GraphQLError(`No user found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND" }});
        }
        return user;
    },

    comics : async () : Promise<ComicModelType[]> => {
        const comic = await ComicModel.find().exec();
        return comic;
    },

    comic : async (_: unknown, args : {id : string}) : Promise<ComicModelType> => {
        const comic = await  ComicModel.findById(args.id);
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND" }});
        }
        return comic;
    },

    collections : async () : Promise<ComicCollectionModelType[]> => {
        const collections = await ComicCollectionModel.find().exec();
        return collections;
    },

    collection : async (_: unknown, args : {id : string}) : Promise<ComicCollectionModelType> => {
        const collecion = await  ComicCollectionModel.findById(args.id);
        if(!collecion){
            throw new GraphQLError(`No collection found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND" }});
        }
        return collecion;
    },
    
}