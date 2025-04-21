import * as dotenv from 'dotenv'
dotenv.config();

import { checkNpmPackageVersionExists, getGithubActionsInstance } from '@services';
import { readCommanLineConfig, deserilizieFileContent, serializeFileContent } from '@utils';

const FILE_PATH = 'package.json';

export const main = async () => {
  try {
    const config = await readCommanLineConfig();

    await checkNpmPackageVersionExists(config.packageName, config.packageVersion);

    const instance = await getGithubActionsInstance(config);
    const file = await instance.readRepoFile(FILE_PATH);

    const parsedPackageJson = deserilizieFileContent(file.content);
    parsedPackageJson.dependencies[config.packageName] = config.packageVersion;

    await instance.createBranch();

    await instance.writeRepoFile(
      FILE_PATH,
      file.sha,
      serializeFileContent(parsedPackageJson)
    );

    await instance.createPullRequest();

    // TODO improve logging
    console.log('Task has proceeded successfully')
  } catch (err: unknown) {
    // TODO improve error handling
    if (err instanceof Error) {
      console.error('[Error]: ', err.message);
    } else {
      console.error('[Unknown error]', err);
    }
    process.exit();
  }
};

main();
