import { ENV } from "@/server/env.js";
import { logger } from "@/utils/logger.js";

if (ENV.IS_DEV) {
  logger.server(
    `(SERVER STARTUP) 🚀 fixit-api ${ENV.PROJECT_VERSION || ""}
    NODE_ENV...... ${ENV.NODE_ENV}
    AWS Region ... ${ENV.AWS_REGION}
    Timezone ..... ${/([A-Z]+[+-][0-9]+.*)/.exec(new Date().toString())?.[0] ?? "-"}
    Platform ..... ${process.platform}
    PID .......... ${process.pid}
    NodeJS ....... ${process.version}
    Host ......... ${ENV.API_BASE_URL}:${ENV.PORT}
    CWD .......... ${process.cwd()}`
  );
}
