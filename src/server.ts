import Fastify from 'fastify'
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createUser } from './http/create-user';
import { login } from './http/login';
import { fastifyJwt } from '@fastify/jwt';
import { deleteUser } from './http/delete-user';
import { authenticateToken } from './middleware';
import { createNews } from './http/create-news';
import { getNewsOfUser } from './http/get-news-of-user';

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createUser)
app.register(login)
app.register(deleteUser, authenticateToken)
app.register(createNews, authenticateToken)
app.register(getNewsOfUser)

app.register(fastifyJwt, {
  secret: "akd19dd1dj0"
})

app.listen({ port: 3333}).then(() => {
  console.log("HTTP server running!")
})