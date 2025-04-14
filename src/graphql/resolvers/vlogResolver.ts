import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { VlogType } from '../types/VlogType';
import { db } from '../../database';

export const createVlogMutation = {
  type: VlogType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, args: { [key: string]: any }) {
    const { title, description, userId } = args;

    //Validar que el título no sea nulo
    if (!title) {
      throw new Error('El título del vlog no puede estar vacío.');
    }

    //Crear el vlog en la base de datos
    const newVlog = await db.insert('vlogs', {
      title,
      description,
      userId,
      likes: 0,
      createdAt: new Date(),
    });

    return newVlog;
  },
};

export const likeVlogMutation = {
  type: VlogType,
  args: {
    vlogId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, args: { [key: string]: any }) {
    const { vlogId } = args;

    //Buscar el vlog en la base de datos
    const vlog = await db.findOne('vlogs', { id: vlogId });
    if (!vlog) {
      throw new Error('El vlog no existe.');
    }

    //Incrementar el contador de likes
    const updatedVlog = await db.update('vlogs', { id: vlogId }, { likes: vlog.likes + 1 });

    return updatedVlog;
  },
};
import { GraphQLList } from 'graphql';

export const getAllVlogsQuery = {
  type: new GraphQLList(VlogType),
  resolve: async () => {
    const vlogs = await db.findAll('vlogs'); // Llama a la función findAll
    return vlogs || []; // Devuelve un array vacío si no hay resultados
  },
};
