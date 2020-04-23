import CantReadFileError from './error/cant-read-file-error';

import jsonfile = require('jsonfile');

// eslint-disable-next-line no-unused-vars
export default class JsonFileSource {
  private readonly fileMap: Map<string, string[]>;

  constructor(fileMap?: Map<string, string[]>) {
    this.fileMap = fileMap || new Map<string, string[]>();
  }

  setConfig(env: string, ...filenames: string[]): JsonFileSource {
    this.fileMap.set(env, filenames);

    return this;
  }

  addConfig(env: string, ...filenames: string[]): JsonFileSource {
    this.fileMap.set(env, filenames);

    return this;
  }

  removeConfig(env: string): JsonFileSource {
    this.fileMap.delete(env);

    return this;
  }

  async export(): Promise<Map<string, object>> {
    const config = new Map<string, object>();

    const promises = [];
    const keys = [];
    this.fileMap.forEach((values, key) => {
      promises.push(values.map((value) => jsonfile.readFile(value)));
      keys.push(key);
    });
    const jsons: object[][] = await Promise.all(promises);
    if (jsons.length !== keys.length) throw new CantReadFileError();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < jsons.length; i++) {
      config.set(keys[i], jsons[i].reduceRight((pre, cur) => Object.assign(cur, pre), {}));
    }

    return config;
  }
}
