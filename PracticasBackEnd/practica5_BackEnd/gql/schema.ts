export const typeDefs = `#graphql 
    type User {
        id: ID!
        name: String!
        mail: String!
        collection: ComicCollection!
    }

    type Comic {
        id: ID!
        title: String!
        description: String!
        format: String!
    }

    type ComicCollection {
        id: ID!
        name: String!
        comics: [Comic!]!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        comics: [Comic!]!
        comic(id: ID!): Comic!
        collections : [ComicCollection!]!
        collection(id : ID!): ComicCollection!
    }

    type Mutation {
        addUser(name: String!, mail: String!, collection: ID!): User!
        updateUser(id: ID!, name: String, mail: String, collection: ID): User!
        deleteUser(id: ID!): User!
        addComic(title: String!, description: String!, format: String!): Comic!
        updateComic(id: ID!, title: String, description: String, format: String): Comic!
        deleteComic(id: ID!): Comic!
        addCollection(name : String!, comics : [ID!]!) : ComicCollection
        deleteCollection(id : ID!) : ComicCollection
        updateCollection(id : ID!, name : String, comics : [ID]) : ComicCollection
    }
`;
