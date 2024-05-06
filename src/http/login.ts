import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcryptjs'

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/login", {
    schema: {
      summary: "login an user",
      body: z.object({
        email: z.string().email(),
        password: z.string()
      }),
      response: {
        200: z.object({
          message: z.string(),
          token: z.string()
        })
      }
    }
  }, async(request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if(!user) {
        throw new Error('usuário nao encontrado!')
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password)

      if(!passwordMatch) {
        throw new Error("senha incorreta!")
      }

      const token = app.jwt.sign({ userId: user.id }, {expiresIn: '10m'})

      return reply.status(200).send({message: "usuario logado!", token})
  })
}