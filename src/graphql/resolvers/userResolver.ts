import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { UserType } from '../types/UserType';
import { db } from '../../database';
import { GraphQLList } from 'graphql';

export const getUserQuery = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, args: { [key: string]: any }) {
    const userId = args.id; //Extraer el ID del objeto genérico
    const user = await db.findOne('users', { id: userId });
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    return user;
  },
};

export const createUserMutation = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_: any, args: { [key: string]: any }) {
    const { username, email } = args;

    //Validar que el email no esté ya registrado
    const existingUser = await db.findOne('users', { email });
    if (existingUser) {
      throw new Error('El email ya está registrado.');
    }

    //Crear el nuevo usuario
    const newUser = await db.insert('users', {
      username,
      email,
      createdAt: new Date(),
    });

    return newUser;
  },
};

export const getAllUsersQuery = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    //Obtén todos los usuarios de la base de datos
    const users = await db.findAll('users'); 
    return users || []; //Devuelve un array vacío si no hay usuarios
  },
};