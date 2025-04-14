import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { CommentType } from '../types/CommentType';
import { db } from '../../database';

export const addCommentMutation = {
  type: CommentType,
  args: {
    vlogId: { type: new GraphQLNonNull(GraphQLID) }, // ID del vlog
    userId: { type: new GraphQLNonNull(GraphQLID) }, // ID del usuario
    text: { type: new GraphQLNonNull(GraphQLString) }, // Texto del comentario
  },
  async resolve(_: any, args: { [key: string]: any }) {
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
    const newComment = await db.insert('comments', {
      vlogId,
      userId,
      text,
      createdAt: new Date(),
    });

    return newComment;
  },
};