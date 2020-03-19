import JsonFileSource from '../lib';

async function main() {
  const jsonFileSource = new JsonFileSource();

  jsonFileSource
    .setConfig('a', './a.json')
    .setConfig('b', './b.json');

  console.log(await jsonFileSource.export());
}

main();
