
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import readline from 'readline-sync';
import { RuntimeConfig } from '@types';

export const readCommanLineConfig = (): RuntimeConfig => {;
  const argv = yargs(hideBin(process.argv))
    .options({
      packageVersion: { type: 'string', required: true },
      packageName: { type: 'string', required: true },
      repoName: { type: 'string', required: true },
      repoOwner: { type: 'string', required: true },
      targetBranch: { type: 'string', required: false },
    })
    .strict()
    .parseSync();

  const githubToken = readline.question(
    'Enter github access key: ',
    { hideEchoBack: true },
  );
  
  const { packageName, packageVersion, repoName, repoOwner, targetBranch = 'main' } = argv;

  return { packageName, packageVersion, repoName, repoOwner, githubToken, targetBranch };
};
