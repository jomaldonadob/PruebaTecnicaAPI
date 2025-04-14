"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersQuery = exports.createUserMutation = exports.getUserQuery = void 0;
const graphql_1 = require("graphql");
const UserType_1 = require("../types/UserType");
const database_1 = require("../../database");
const graphql_2 = require("graphql");
exports.getUserQuery = {
    type: UserType_1.UserType,
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = args.id; //Extraer el ID del objeto genérico
            const user = yield database_1.db.findOne('users', { id: userId });
            if (!user) {
                throw new Error('Usuario no encontrado.');
            }
            return user;
        });
    },
};
exports.createUserMutation = {
    type: UserType_1.UserType,
    args: {
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email } = args;
            //Validar que el email no esté ya registrado
            const existingUser = yield database_1.db.findOne('users', { email });
            if (existingUser) {
                throw new Error('El email ya está registrado.');
            }
            //Crear el nuevo usuario
            const newUser = yield database_1.db.insert('users', {
                username,
                email,
                createdAt: new Date(),
            });
            return newUser;
        });
    },
};
exports.getAllUsersQuery = {
    type: new graphql_2.GraphQLList(UserType_1.UserType),
    resolve: () => __awaiter(void 0, void 0, void 0, function* () {
        //Obtén todos los usuarios de la base de datos
        const users = yield database_1.db.findAll('users');
        return users || []; //Devuelve un array vacío si no hay usuarios
    }),
};
