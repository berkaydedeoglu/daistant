import Fastifyq, {
  FastifyReply,
  FastifyRequest,
  FastifyInstance,
} from "fastify";
import { Config } from "./config/config";
import { container } from "tsyringe";

class App {
  private fastify: FastifyInstance;
  private config: Config;

  constructor(fastify: FastifyInstance) {
    this.config = container.resolve(Config);
    this.fastify = Fastifyq({ logger: true });
    this.createRoutes();
  }

  public startRestApi() {
    this.fastify.listen({
      port: Number(this.config.get("BULLETIN_SERVICE_PORT")),
      host: this.config.get("BULLETIN_SERVICE_HOST"),
    });
  }

  private createRoutes() {
    this.fastify.get(
      "/health",
      async (request: FastifyRequest, reply: FastifyReply) => {
        return { status: "ok" };
      },
    );
  }

  private createDependencyContainer() {}
}
