import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./gql/schema.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";
import { ComicCollection } from "./resolvers/ComicCollection.ts";
import { User } from "./resolvers/User.ts";

export const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    ComicCollection
  }
});
