import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLID }, // ID único del comentario
    vlogId: { type: GraphQLID }, // ID del vlog al que pertenece el comentario
    userId: { type: GraphQLID }, // ID del usuario que hizo el comentario
    text: { type: GraphQLString }, // Texto del comentario
    createdAt: { type: GraphQLString }, // Fecha de creación del comentario
  },
});