import Fastify from 'fastify'

import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";


import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createUser } from './http/create-user';
import { login } from './http/login';
import { fastifyJwt } from '@fastify/jwt';
import { deleteUser } from './http/delete-user';
import { authenticateToken } from './middleware';
import { createNews } from './http/create-news';
import { getNewsOfUser } from './http/get-news-of-user';
import fastifyCors from '@fastify/cors';


const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'News-API',
      description: 'Uma API onde é possível usuários cadastrar notícias..',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
})

app.register(createUser)
app.register(login)
app.register(deleteUser, authenticateToken)
app.register(createNews, authenticateToken)
app.register(getNewsOfUser)

app.register(fastifyJwt, {
  secret: "akd19dd1dj0"
})

app.listen({ port: 3333, host: '0.0.0.0'}).then(() => {
  console.log("HTTP server running!")
})