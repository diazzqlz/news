import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createNews(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/news/:userId", {
    schema: {
      tags: ['news'],
      summary: "create a news",
      body: z.object({
        title: z.string().min(5),
        paragraph: z.string().max(120)
      }),
      params: z.object({
        userId: z.string()
      }),
      response: {
        200: z.object({
          message: z.string()
        })
      }
    }
  }, async(request, reply) => {
      const { title, paragraph } = request.body
      const { userId } = request.params

      const newWithSameTitle = await prisma.new.findUnique({
        where: {
          title 
        }
      })

      if(newWithSameTitle) {
        return reply.status(400).send({ message: "noticia ja criada."})
      }

      await prisma.new.create({
        data: {
          userId: userId,
          paragraph,
          title
        }
      })

      reply.status(200).send({ message: "notícia cadastrada!"})
  })
}