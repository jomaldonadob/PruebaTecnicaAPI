import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import { CommentType } from './CommentType';

export const VlogType = new GraphQLObjectType({
  name: 'Vlog',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    likes: { type: GraphQLInt },
    comments: { type: new GraphQLList(CommentType) }, // Lista de comentarios
    createdAt: { type: GraphQLString },
    userId: { type: GraphQLID }, // Relación con el usuario que creó el vlog
  },
});