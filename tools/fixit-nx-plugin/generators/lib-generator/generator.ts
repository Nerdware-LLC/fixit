import { join as pathJoin, relative as pathRelative, resolve as pathResolve } from "path";
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  readJson,
  writeJson,
  type ProjectConfiguration,
} from "@nx/devkit";

/**
 * Options for the internal fixit lib generator
 */
export interface LibGeneratorSchema {
  name: string;
  /** The name of the common/shared Vitest config to extend from (default: `"node"`). */
  vitestConfig?: keyof typeof VITEST_COMMON_CONFIGS;
}

/**
 * Dictionary of available common/shared Vitest configs
 */
const VITEST_COMMON_CONFIGS = {
  node: {
    filename: "vitest.node-configs.js",
    exportName: "commonVitestNodeConfigs",
  },
} as const satisfies Record<string, { filename: string; exportName: string }>;

/**
 * Internal fixit lib generator
 * @param tree - The file tree
 * @param options - The generator options
 *
 * **Docs:**
 * - [nx: creating a generator](https://nx.dev/extending-nx/recipes/local-generators#creating-a-generator)
 * - [@nx/devkit reference](https://nx.dev/nx-api/devkit/documents/nx_devkit)
 */
export default async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
  // Get options/args passed to the generator:
  const { name: projectName, vitestConfig = "node" } = options;

  // Define workspace + project roots and nx configs:
  const projectRootDir = `libs/${projectName}`;
  const projectNxConfigFile = `${projectRootDir}/project.json`;

  // This creates the project.json file
  addProjectConfiguration(tree, projectName, {
    root: projectRootDir,
    projectType: "library",
    sourceRoot: `${projectRootDir}/src`,
    tags: [],
    targets: {
      "lint": {
        executor: "@nx/eslint:lint",
        options: {
          lintFilePatterns: [`${projectRootDir}/**/*`],
        },
      },
      "lint-types": {
        options: {
          cwd: projectRootDir,
        },
      },
      "test": {
        executor: "@nx/vite:test",
        options: {
          vitestConfig: `${projectRootDir}/vitest.config.ts`,
        },
      },
    },
  });

  // Get the Vitest-related template args:
  const vitestTemplateArgs = VITEST_COMMON_CONFIGS[vitestConfig];

  // Generate project base files using the templates in ./files/
  generateFiles(tree, pathJoin(__dirname, "files"), projectRootDir, {
    ...options,
    tsconfigExtendsPath: `${pathRelative(projectRootDir, tree.root)}/tsconfig.base.json`,
    vitestBaseConfigNamedExport: vitestTemplateArgs.exportName,
    vitestBaseConfigPath: pathRelative(
      projectRootDir,
      pathResolve(tree.root, "libs/vitest-utils/common-configs/", vitestTemplateArgs.filename)
    ),
  });

  // Read the project.json file, use destructuring to remove the $schema field.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $schema, ...projectConfig } = readJson<ProjectConfiguration & { $schema: string }>(
    tree,
    projectNxConfigFile
  );

  // Write the updated project.json file back to the tree
  writeJson(tree, projectNxConfigFile, projectConfig);

  // This fn runs Prettier on the files in the tree
  await formatFiles(tree);
}
