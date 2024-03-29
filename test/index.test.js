/* eslint-disable no-lone-blocks */
const { deepStrictEqual } = require('assert');
const { execSync } = require('child_process');

const exec = (command) => execSync(command, { cwd: __dirname }).toString();

console.time('Test took');

const afterAll = () => {
  exec('rm *.txt*');
};

{
  exec('npm link');
}

{
  console.log('[Test] The compression should generate a new file');

  exec('truncate -s 2G testfile.txt');
  exec('npacker pack testfile.txt');
  const output = exec('ls');

  deepStrictEqual(output.includes('testfile.txt.gz'), true);

  console.log('[OK]');

  afterAll();
}

console.timeEnd('Test took');
