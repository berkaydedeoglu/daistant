import Fastifyq from "fastify";

const fastify = Fastifyq({ logger: true });

fastify.get("/health", async (request, reply) => {
  return { status: "ok" };
});

fastify.listen({
  port: 3065,
  host: "0.0.0.0",
});
