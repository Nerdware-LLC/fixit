import { defineConfig, mergeConfig } from "vitest/config";
import { commonVitestNodeConfigs } from "../../libs/vitest-utils/common-configs/vitest.node-configs.js";

export default mergeConfig(
  commonVitestNodeConfigs,
  defineConfig({
    test: {
      setupFiles: ["vitest.setup.ts"],
      server: {
        deps: {
          // This config allows mocking the package's underlying @aws-sdk imports
          inline: ["@nerdware/ddb-single-table"],
        },
      },
    },
  })
);
