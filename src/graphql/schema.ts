import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { getUserQuery, createUserMutation } from './resolvers/userResolver';
import { addCommentMutation } from './resolvers/commentResolver';
import { createVlogMutation, likeVlogMutation } from './resolvers/vlogResolver';
import { getAllVlogsQuery } from './resolvers/vlogResolver';
import { getAllUsersQuery } from './resolvers/userResolver';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser: getUserQuery,
    getAllVlogs: getAllVlogsQuery,
    getAllUsers: getAllUsersQuery, 
  },
});

//Definición de las mutations principales
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: createUserMutation, 
    addComment: addCommentMutation, 
    createVlog: createVlogMutation, 
    likeVlog: likeVlogMutation,
  },
});

//esquema principal
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
