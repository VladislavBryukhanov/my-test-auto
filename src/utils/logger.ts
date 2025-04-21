// TODO improve logging
export const logAction = (action: string, details: string) => {
  console.log(`${action}: ${details}`);
};

export const logError = (err: unknown) => {
  if (err instanceof Error) {
    console.error('[Error]: ', err.message);
  } else {
    console.error('[Unknown error]', err);
  }
};
