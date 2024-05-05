import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function deleteUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete("/delete/:userId", {
    schema: {
      params: z.object({
        userId: z.string()
      })
    }
  }, async (request, reply) => {
      const { userId } = request.params

      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if(!user) {
        return reply.status(400).send({ message: "usuario nao encontrado!"})
      }

      await prisma.user.delete({
        where: {
          id: userId
        }
      })

      return reply.status(200).send({ message: "usuário deletado!"})
  })
}