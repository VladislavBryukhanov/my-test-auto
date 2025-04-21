export type RuntimeConfig = {
  packageName: string;
  packageVersion: string;
  repoName: string;
  repoOwner: string;
  targetBranch: string;
  githubToken: string;
};

export type CliArgs = {
  packageName: string;
  packageVersion: string;
  repoName: string;
  repoOwner: string;
};
