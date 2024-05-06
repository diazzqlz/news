import { FastifyInstance } from "fastify";

export async function authenticateToken(app: FastifyInstance) {
  app.addHook("onRequest", async(request, reply) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
      return reply.status(400).send({ message: "token de autenticação vazio" })
    }

    try {
      await request.jwtVerify()
    } catch (err) {
      reply.status(400).send({ message: "token invalido!"})
    }
    
  })
}