import fs from 'fs/promises';

export const readFile = async (path: string) => {
  try {
    return await fs.readFile(path, { encoding: 'utf8' });
  } catch (e) {
    console.error(e);
  }
}