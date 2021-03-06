#!/usr/bin/env node

'use strict'

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const { promisify } = require('util')

async function main() {
  const [,, command, file] = process.argv

  console.log(command, file)

  if (command === 'pack') {
    const gzip = zlib.createGzip()
    const source = fs.createReadStream(file)
    const destination = fs.createWriteStream(`${file}.gz`)
  
    await promisify(stream.pipeline)(source, gzip, destination)
  } else if (command === 'unpack') {
    const buffer = await promisify(fs.readFile)(file)
    const unpacked = await promisify(zlib.unzip)(buffer)

    await promisify(fs.writeFile)(file.replace('.gz', ''), unpacked)
  } else {
    console.error('Invalid command')
  }
}

main()
