import CantReadFileError from '../error/cant-read-file-error';

import jsonfile = require('jsonfile');

// eslint-disable-next-line no-unused-vars
export default class JsonFileSource {
  private readonly fileMap: Map<string, string>;

  constructor(fileMap?: Map<string, string>) {
    this.fileMap = fileMap || new Map<string, string>();
  }

  setConfig(env: string, filename: string): JsonFileSource {
    this.fileMap.set(env, filename);

    return this;
  }

  removeConfig(env: string, filename: string): JsonFileSource {
    this.fileMap.set(env, filename);

    return this;
  }

  async export(): Promise<Map<string, object>> {
    const map = new Map<string, object>();

    const promises = [];
    const keys = [];
    this.fileMap.forEach((value, key) => {
      promises.push(jsonfile.readFile(value));
      keys.push(key);
    });
    const jsons = await Promise.all(promises);
    if (jsons.length !== keys.length) throw new CantReadFileError();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < jsons.length; i++) {
      map.set(keys[i], jsons[i]);
    }

    return map;
  }
}
