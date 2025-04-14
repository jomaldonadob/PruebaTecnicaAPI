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
const validators_1 = require("../../utils/validators");
const database_1 = require("../../database");
exports.addCommentMutation = {
    type: CommentType_1.CommentType,
    args: {
        vlogId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vlogId, userId, text } = args;
            // Validar el texto del comentario
            if (!(0, validators_1.validateCommentText)(text)) {
                throw new Error('El texto del comentario no es válido. Debe ser no nulo, contener solo caracteres ASCII y tener un máximo de 1000 caracteres.');
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
