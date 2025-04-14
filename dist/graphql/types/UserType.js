"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
const VlogType_1 = require("./VlogType");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLID },
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        vlogs: { type: new graphql_1.GraphQLList(VlogType_1.VlogType) },
    },
});
