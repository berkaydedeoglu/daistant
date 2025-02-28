import * as dotenv from "dotenv";
import { injectable } from "tsyringe";

@injectable()
export class Config {
  public readonly envDefaults: Record<string, string> = {
    BULLETIN_SERVICE_PORT: "3000",
    BULLETIN_SERVICE_HOST: "0.0.0.0",

    NATS_SERVERS: "nats://localhost:4222",
    NATS_USER: "admin",
    NATS_PASSWORD: "password",
  };

  constructor() {
    dotenv.config({ path: this.findConfigPath() });
  }

  public get(key: string): string {
    return process.env[key] || String(this.envDefaults[key]);
  }

  private findConfigPath(): string {
    switch (process.env.NODE_ENV) {
      case "test":
        return `${process.cwd()}/.env.test`;
      case "production":
        return `${process.cwd()}/.env.prod`;
      default:
        return `~/devel/daistant/.env`;
    }
  }
}
