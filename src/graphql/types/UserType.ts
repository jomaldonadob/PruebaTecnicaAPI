import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { VlogType } from './VlogType';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    vlogs: { type: new GraphQLList(VlogType) },
  },
});