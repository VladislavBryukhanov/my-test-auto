import * as dotenv from 'dotenv';
dotenv.config();

import { checkNpmPackageVersionExists, getGithubActionsInstance } from '@services';
import { readCommanLineConfig, deserilizieFileContent, serializeFileContent } from '@utils';
import { logAction, logError } from 'utils/logger';

const FILE_PATH = 'package.json';

export const main = async () => {
  try {
    const config = await readCommanLineConfig();

    await checkNpmPackageVersionExists(config.packageName, config.packageVersion);

    const instance = await getGithubActionsInstance(config);
    const file = await instance.readRepoFile(FILE_PATH);

    const parsedPackageJson = deserilizieFileContent(file.content);

    if (!parsedPackageJson.dependencies[config.packageName]) {
      throw new Error('No such package in the repo!');
    }

    parsedPackageJson.dependencies[config.packageName] = config.packageVersion;

    await instance.createBranch();

    await instance.writeRepoFile(
      FILE_PATH,
      file.sha,
      serializeFileContent(parsedPackageJson)
    );

    await instance.createPullRequest();

    logAction('The App', 'has proceeded successfully');
  } catch (err: unknown) {
    logError(err);
    process.exit();
  }
};

main();
