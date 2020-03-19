# conev-source-json

conev-source-json is an implementation of conev's source to get configuration from json.

![](https://img.shields.io/npm/dm/conev-source-json.png?style=flat-square)

​    

## Install

```shell
# with npm 
npm install conev-source-json
 
# or with Yarn 
yarn add conev-source-json
```

​    

## Usage

Get ConfigBuilder from conev and Sources to use.

```typescript
import { ConfigBuilder } from 'conev';
import JsonFileSource from 'conev-source-json';
```

And create Source and set up.

```typescript
const jsonSource = new JsonFileSource();

jsonSource    
	.setConfig('basic', basic) // basic is JSON
    .setConfig('dev', dev) // dev is JSON
    .setConfig('prd', prd); // prd is JSON
```

Create ConfigBuilder and set Environment, add source. (highest priority is added first).

```typescript
const builder = new ConfigBuilder();

builder
    .setEnv('dev', 'basic')
    .addSource(jsonSource);
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

## Json Source

```typescript
class JsonFileSource {
    constructor(map?: Map<string, object>);
    setConfig(env: string, value: object): JsonFileSource;
    removeConfig(env: string, value: object): JsonFileSource;
    export(): Promise<Map<string, object>>;
}

```

`JsonFileSource` defines the source from JSON. Use `setConfig` to add a configuration for a new environment or ` removeConfig` to delete a configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

​    

