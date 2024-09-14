import { GraphQLError } from "graphql";
import { UserModel, UserModelType } from "../db/user.ts";
import { ComicModel,ComicModelType } from "../db/comic.ts";
import { ComicCollectionModel, ComicCollectionModelType } from "../db/comicCollection.ts";
import { ComicCollection } from "../types.ts";
import { getComicCollectionFromModel } from "../controllers/getComicCollectionFromModel.ts";

export const Mutation = {
    addUser : async (
        _:unknown,
        args : {name : string, mail : string, collection : string}
    ) : Promise<UserModelType> => {
        const user = {
            name : args.name,
            mail : args.mail,
            collection : args.collection
        }
        const newUser : UserModelType = await UserModel.create(user);
        return newUser;
    },
    
    deleteUser : async (
        _: unknown, 
        args : { id : string }
    ) : Promise<UserModelType> => {
        const user = await UserModel.findByIdAndDelete(args.id);
        if(!user){
            throw new GraphQLError(`No user found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND"},
        });
        }
        return user;
    },

    updateUser : async (
        _:unknown,
        args : {id : string, name : string, mail : string, collection : string}
    ) : Promise<UserModelType> => {
        const user = await UserModel.findByIdAndUpdate(
            args.id,
            {name : args.name, mail : args.mail, collection : args.collection},
            {new : true, runValidators : true}
        );
        if(!user){
            throw new GraphQLError(`No user found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND"},
        });
        }
        return user;
    },

    addComic : async (
        _:unknown,
        args : {title : string, description : string, format : string}
    ) : Promise<ComicModelType> => {
        const comic = {
            title : args.title,
            description : args.description,
            format : args.format
        }
        const newComic : ComicModelType = await ComicModel.create(comic);
        return newComic;
    },
    deleteComic : async (
        _: unknown, 
        args : { id : string }
    ) : Promise<ComicModelType> => {
        const comic = await ComicModel.findByIdAndDelete(args.id);
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND"},
        });
        }
        return comic;
    },

    updateComic : async (
        _:unknown,
        args : {id : string, title : string, description : string, format : string}
    ) : Promise<ComicModelType> => {
        const comic = await ComicModel.findByIdAndUpdate(
            args.id,
            {title : args.title, description : args.description, format : args.format},
            {new : true, runValidators : true}
        );
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND"},
        });
        }
        return comic;
    },

    addCollection : async (
        _:unknown,
        args : {name : string, comics : [string]}
    ) : Promise<ComicCollectionModelType> => {
        const collection = {
            name : args.name,
            comics : args.comics,
        }
        const newCollection : ComicCollectionModelType = await ComicCollectionModel.create(collection);
        return newCollection;
    },

    deleteCollection : async (
        _: unknown, 
        args : { id : string }
    ) : Promise<ComicCollection> => {
        const collectionDoc = await ComicCollectionModel.findByIdAndDelete(args.id);
        if(!collectionDoc){
            throw new GraphQLError(`No collection found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND"},
        });
        }
        const collection = await getComicCollectionFromModel(collectionDoc);
        return collection;
    },
    
    updateCollection : async (
        _:unknown,
        args : {id : string, name : string, comics : [string]}
    ) : Promise<ComicCollection> => {
        const collectionDoc = await ComicCollectionModel.findByIdAndUpdate(
            args.id,
            {name : args.name, comics : args.comics},
            {new : true, runValidators : true}
        );
        if(!collectionDoc){
            throw new GraphQLError(`No collection found with id ${args.id}`,
            {extensions : {code : "NOT_FOUND"},
        });
        }
        const collection = await getComicCollectionFromModel(collectionDoc);
        return collection;
    },
}