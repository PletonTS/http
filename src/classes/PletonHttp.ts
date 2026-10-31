import {Hono} from "hono";
import {serve} from "@hono/node-server"

export class PletonHttp {
  private honoInstance = new Hono()

  public _mapRoute(path: string, method: "get" | "post" | "put" | "patch" | "delete", fn: () => any) {
    this.honoInstance[method](path, async (c) => c.json(await fn()))
  }

  async listen(port: number): Promise<void> {
    serve({
      fetch: this.honoInstance.fetch,
      port,
    })
  }
}