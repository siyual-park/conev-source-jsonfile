# conev-source-jsonfile

conev-source-jsonfile is an implementation of conev's source to get configuration from json file.

![](https://img.shields.io/npm/dm/conev-source-jsonfile.png?style=flat-square)

​    

## Install

```shell
# with npm 
npm install conev-source-jsonfile
 
# or with Yarn 
yarn add conev-source-jsonfile
```

​    

## Usage

Get ConfigBuilder from conev and Sources to use.

```typescript
import { ConfigBuilder } from 'conev';
import ProcessEnvSource from 'conev-source-jsonfile';
```

And create Source and set up.

```typescript
const jsonFileSource = new ProcessEnvSource();

jsonFileSource    
	.setConfig('basic', './basic.json') // basic is JSON
    .setConfig('dev', './dev.json') // dev is JSON
    .setConfig('prd', './prd.json'); // prd is JSON
```

Create ConfigBuilder and set Environment, add source. (highest priority is added first).

```typescript
const builder = new ConfigBuilder();

builder
    .setEnv('dev', 'basic')
    .addSource(jsonFileSource);
```

Build configuration

```typescript
const config = await builder.build(); // This is the result of combining dev and basic.
```

Use configuration

```typescript
config.get() // The whole configuration created comes out
config.get('a.b.c'); // Is same as config.get().a.b.c
```

​    

## Json File Source

```typescript
class JsonFileSource {
    constructor(fileMap?: Map<string, string>);
    setConfig(env: string, ...filenames: string[]): JsonFileSource;
    addConfig(env: string, ...filename: string[]): JsonFileSource;
    removeConfig(env: string): JsonFileSource;
    export(): Promise<Map<string, object>>;
}
```

`ProcessEnvSource` defines the source from JSON file. Use `setConfig` to add a configuration for a new environment or ` removeConfig` to delete a configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

​    

