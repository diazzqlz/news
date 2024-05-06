import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcryptjs'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/register", {
    schema: {
      summary: "create an user",
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5)
      }),
      response: {
        201: z.object({
          message: z.string()
        })
      }
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

      const saltRounds = 10

      const passwordHashed = await bcrypt.hash(password, saltRounds)

      await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHashed
        }
      })

      return reply.status(201).send({message: "usuário criado com sucesso!" })
  })
}