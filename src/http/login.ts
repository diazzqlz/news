import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import jwt from 'jsonwebtoken'

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/login", {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string()
      })
    }
  }, async(request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if(!user) {
        return reply.status(400).send({message: "usuário nao encontrado!"})
      }

      if(password !== user.password) {
        return reply.status(400).send({message: "senha incorreta!"})
      }

      const token = app.jwt.sign({ userId: user.id }, {expiresIn: '5m'})

      return reply.status(200).send({message: "usuario logado!", token})
  })
}