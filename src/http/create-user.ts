import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/register", {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5)
      }),
      response: 201
    }
  }, async(request, reply) => {
      const { name, email, password } = request.body

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })


      if(user) {
        return reply.status(400).send({message: "usuário já cadastrado!"})
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password
        }
      })

      return reply.status(201).send({message: "usuário criado com sucesso!"})
  })
}