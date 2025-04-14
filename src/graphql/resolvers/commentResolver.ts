import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { CommentType } from '../types/CommentType';
import { validateCommentText } from '../../utils/validators';
import { db } from '../../database';

export const addCommentMutation = {
  type: CommentType,
  args: {
    vlogId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_: any, args: { [key: string]: any }) {
    const { vlogId, userId, text } = args;

    // Validar el texto del comentario
    if (!validateCommentText(text)) {
      throw new Error(
        'El texto del comentario no es válido. Debe ser no nulo, contener solo caracteres ASCII y tener un máximo de 1000 caracteres.'
      );
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