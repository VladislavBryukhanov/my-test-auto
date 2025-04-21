import { Octokit } from 'octokit';
import { RuntimeConfig } from '@types';

export const getGithubActionsInstance = async ({
  githubToken,
  packageName,
  packageVersion,
  targetBranch,
  repoOwner,
  repoName,
}: RuntimeConfig) => {
  const octokit = new Octokit({ auth: githubToken });

  const { COMPANY_NAME, FEATURE_BRANCH_PREFIX } = process.env;

  const commonConfig = {
    owner: repoOwner,
    repo: repoName,
  };

  const targetBranchName = `${FEATURE_BRANCH_PREFIX}-${packageName}-${packageVersion}`;

  const createBranch = async () => {
    const baseRef = await octokit.rest.git.getRef({
      ...commonConfig,
      ref: `heads/${targetBranch}`,
    });

    const latestCommitSha = baseRef.data.object.sha;

    await octokit.rest.git.createRef({
      ...commonConfig,
      ref: `refs/heads/${targetBranchName}`,
      sha: latestCommitSha,
    });
    // TODO improve logging
    console.log('Github Branch has been created');
  };

  const createPullRequest = async () => {
    await octokit.rest.pulls.create({
     ...commonConfig,
      base: targetBranch,
      head: targetBranchName,

      title: `Auto PR from ${COMPANY_NAME} - Upgrade ${packageName}-${packageVersion}`,
      body: `Auto generated PR to audit package version and upgrade ${packageName} to ${packageVersion} version`,
    });
    // TODO improve logging
    console.log('Github Pull Request has been created');
  };

  const readRepoFile = async (path: string) => {
    const response = await octokit.rest.repos.getContent({
      ...commonConfig,
      ref: targetBranch,
      path,
    });

    return response.data;
  };

  const writeRepoFile = async (path: string, sha: string, content: string) => {
    await octokit.rest.repos.createOrUpdateFileContents({
      ...commonConfig,
      path,
      branch: targetBranchName,
      message: `Upgrade ${packageName} to ${packageVersion} version in package.json`,
      content,
      sha,
    });
    // TODO improve logging
    console.log('Github Commit has been created');
  };

  return {
    createBranch,
    createPullRequest,
    readRepoFile,
    writeRepoFile,
  };
};
