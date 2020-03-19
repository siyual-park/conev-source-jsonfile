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

    for (let [key, value] of this.fileMap) {
      map.set(key, await jsonfile.readFile(value));
    }
    return map;
  }
}
