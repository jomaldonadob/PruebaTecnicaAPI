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
exports.addCommentMutation = void 0;
const graphql_1 = require("graphql");
const CommentType_1 = require("../types/CommentType");
const database_1 = require("../../database");
exports.addCommentMutation = {
    type: CommentType_1.CommentType,
    args: {
        vlogId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }, // ID del vlog
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }, // ID del usuario
        text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }, // Texto del comentario
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vlogId, userId, text } = args;
            // Validar que el texto no sea nulo, no exceda 1000 caracteres y contenga solo caracteres ASCII
            if (!text || text.length > 1000) {
                throw new Error('El texto del comentario no es válido. Debe tener entre 1 y 1000 caracteres.');
            }
            const asciiRegex = /^[\x00-\x7F]*$/;
            if (!asciiRegex.test(text)) {
                throw new Error('El texto del comentario solo puede contener caracteres ASCII.');
            }
            // Registrar el comentario en la base de datos
            const newComment = yield database_1.db.insert('comments', {
                vlogId,
                userId,
                text,
                createdAt: new Date(),
            });
            return newComment;
        });
    },
};
