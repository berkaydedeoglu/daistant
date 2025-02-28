import * as nats_core from "@nats-io/nats-core";
import { singleton, container } from "tsyringe";
import { Config } from "../config/config";

@singleton()
export class Nats {
  private nats: nats_core.NatsConnection | null = null;
  private config: Config;

  constructor() {
    this.config = container.resolve(Config);
  }

  public async connect(): Promise<void> {
    if (this.nats) {
      return;
    }

    this.nats = await nats_core.wsconnect({
      servers: this.config.get("NATS_SERVERS"),
      user: this.config.get("NATS_USER"),
      pass: this.config.get("NATS_PASSWORD"),
    });
  }

  public publish(subject: string, data: string): void {
    if (!this.nats) {
      throw new Error("NATS connection not established");
    }
    this.nats.publish(subject, data);
  }

  public subscribe(subject: string, queue: string): nats_core.Subscription {
    if (!this.nats) {
      throw new Error("NATS connection not established");
    }
    return this.nats.subscribe(subject, { queue });
  }
}
