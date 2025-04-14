# Vlogging API

Una API GraphQL para gestionar usuarios, vlogs y comentarios.

## Instalación
```
npm install
```
Ejecución en modo desarrollo
```
npm run dev
```
Ejecución en modo producción
```
npm run build
npm start
```
Acceso a la API
URL: http://localhost:4000/graphql

Ejemplos de Queries y Mutations
Crear un usuario
```
mutation {
  createUser(username: "JohnDoe", email: "john@example.com") {
    id
    username
    email
  }
}
```
