"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VlogType = void 0;
const graphql_1 = require("graphql");
const CommentType_1 = require("./CommentType");
exports.VlogType = new graphql_1.GraphQLObjectType({
    name: 'Vlog',
    fields: {
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        likes: { type: graphql_1.GraphQLInt },
        comments: { type: new graphql_1.GraphQLList(CommentType_1.CommentType) }, // Lista de comentarios
        createdAt: { type: graphql_1.GraphQLString },
        userId: { type: graphql_1.GraphQLID }, // Relación con el usuario que creó el vlog
    },
});
