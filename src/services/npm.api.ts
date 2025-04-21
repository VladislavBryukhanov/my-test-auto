import axios, { isAxiosError } from 'axios';

const NPM_BASE_URL = 'https://registry.npmjs.org';

export const checkNpmPackageVersionExists = async (pkgName: string, version: string) => {
  const url = `${NPM_BASE_URL}/${pkgName}`;
  let data;

  try {
    ({ data } = await axios.get(url));
  } catch (err: unknown) {
    // TODO improve error handling
    if (isAxiosError(err)) {
      if (err.response && err.response.status === 404) {
        throw new Error(`Package "${pkgName}" not found on NPM`);
      } else {
        console.log('err', err)
        throw new Error('Error checking NPM package: ' + err.message);
      }
    }

    throw err;
  }

  if (version in data.versions) {
    // TODO improve logging
    console.log(`${pkgName}@${version} — Found an appropriate package and version on NPM`);
  } else {
    throw new Error(`Version ${version} for ${pkgName} doesn't exists on NPM`);
  }
};
