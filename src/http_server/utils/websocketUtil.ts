export const stringifyObject = (obj: unknown): string | Buffer => {
  if (typeof obj !== 'object' || obj === null) {
    return JSON.stringify(obj);
  }

  const stringifiedProperties = Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        const stringValue = stringifyObject(value);
        return `"${key}": ${JSON.stringify(stringValue)}`;
      } else {
        return `"${key}": ${JSON.stringify(value)}`;
      }
    })
    .join(',');

  return `{${stringifiedProperties}}`;
};
