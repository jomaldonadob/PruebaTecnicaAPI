"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentType = void 0;
const graphql_1 = require("graphql");
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: { type: graphql_1.GraphQLID }, // ID único del comentario
        vlogId: { type: graphql_1.GraphQLID }, // ID del vlog al que pertenece el comentario
        userId: { type: graphql_1.GraphQLID }, // ID del usuario que hizo el comentario
        text: { type: graphql_1.GraphQLString }, // Texto del comentario
        createdAt: { type: graphql_1.GraphQLString }, // Fecha de creación del comentario
    },
});
