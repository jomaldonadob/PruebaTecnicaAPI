"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const userResolver_1 = require("./resolvers/userResolver");
const commentResolver_1 = require("./resolvers/commentResolver");
const vlogResolver_1 = require("./resolvers/vlogResolver");
const vlogResolver_2 = require("./resolvers/vlogResolver");
const userResolver_2 = require("./resolvers/userResolver");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        getUser: userResolver_1.getUserQuery,
        getAllVlogs: vlogResolver_2.getAllVlogsQuery,
        getAllUsers: userResolver_2.getAllUsersQuery,
    },
});
//Definición de las mutations principales
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: userResolver_1.createUserMutation,
        addComment: commentResolver_1.addCommentMutation,
        createVlog: vlogResolver_1.createVlogMutation,
        likeVlog: vlogResolver_1.likeVlogMutation,
    },
});
//esquema principal
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
