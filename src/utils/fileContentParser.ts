import { GitHubContentFile } from "@types";

export const serializeFileContent = (content: GitHubContentFile) => {
  const contentJSON = JSON.stringify(content, null, 2) + '\n';
  return Buffer.from(contentJSON).toString('base64');
};

export const deserilizieFileContent = (contentEncoded: string) => {
  const content = Buffer.from(contentEncoded, 'base64').toString('utf-8');

  const parsedContent = JSON.parse(content);

  return parsedContent;
};
