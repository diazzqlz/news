import Fastify from 'fastify'
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createUser } from './http/create-user';

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createUser)

app.listen({ port: 3333}).then(() => {
  console.log("HTTP server running!")
})