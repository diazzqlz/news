import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getNewsOfUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/news/:id", {
    schema: {
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
      const { id } = request.params

      const user = await prisma.user.findUnique({
        where: {
          id
        }
      })

      if (!user) {
        throw new Error("usuário nao encontrado")
      }

      const news = await prisma.user.findMany({
        where: {
          id
        },
        select: {
          news: true
        }
      })

      return reply.status(200).send({
        news
      })
  })
}