import * as dotenv from "dotenv";
import { injectable } from "tsyringe";

@injectable()
export class Config {
  constructor() {
    dotenv.config({ path: this.findConfigPath() });
  }
  public static readonly PORT = process.env.PORT || 3000;

  private findConfigPath(): string {
    switch (process.env.NODE_ENV) {
      case "test":
        return `${process.cwd()}/env.test.yaml`;
      case "production":
        return `${process.cwd()}/env.production.yaml`;
      default:
        return `~/devel/daistant/.env`;
    }
  }
}
