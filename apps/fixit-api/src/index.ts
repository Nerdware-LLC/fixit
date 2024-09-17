import "@/server/init.js";
import { httpServer } from "@/httpServer.js";
import { ENV } from "@/server/env.js";
import { logger } from "@/utils/logger.js";

await httpServer.start({ port: ENV.PORT }, () => {
  logger.server("👂 Server is listening.");
});
