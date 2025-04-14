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
exports.getAllVlogsQuery = exports.likeVlogMutation = exports.createVlogMutation = void 0;
const graphql_1 = require("graphql");
const VlogType_1 = require("../types/VlogType");
const database_1 = require("../../database");
exports.createVlogMutation = {
    type: VlogType_1.VlogType,
    args: {
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        description: { type: graphql_1.GraphQLString },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, userId } = args;
            // Validar que el título no sea nulo
            if (!title) {
                throw new Error('El título del vlog no puede estar vacío.');
            }
            // Crear el vlog en la base de datos
            const newVlog = yield database_1.db.insert('vlogs', {
                title,
                description,
                userId,
                likes: 0,
                createdAt: new Date(),
            });
            return newVlog;
        });
    },
};
exports.likeVlogMutation = {
    type: VlogType_1.VlogType,
    args: {
        vlogId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vlogId } = args;
            // Buscar el vlog en la base de datos
            const vlog = yield database_1.db.findOne('vlogs', { id: vlogId });
            if (!vlog) {
                throw new Error('El vlog no existe.');
            }
            // Incrementar el contador de likes
            const updatedVlog = yield database_1.db.update('vlogs', { id: vlogId }, { likes: vlog.likes + 1 });
            return updatedVlog;
        });
    },
};
const graphql_2 = require("graphql");
exports.getAllVlogsQuery = {
    type: new graphql_2.GraphQLList(VlogType_1.VlogType),
    resolve: () => __awaiter(void 0, void 0, void 0, function* () {
        const vlogs = yield database_1.db.findAll('vlogs'); // Llama a la función findAll
        return vlogs || []; // Devuelve un array vacío si no hay resultados
    }),
};
