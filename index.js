#!/usr/bin/env node

'use strict'

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const { promisify } = require('util')

async function main() {
  const [,, command, file] = process.argv

  if (command === 'pack') {
    const gzip = zlib.createGzip()
    const source = fs.createReadStream(file)
    const destination = fs.createWriteStream(`${file}.gz`)

    await promisify(stream.pipeline)(source, gzip, destination)
  } else if (command === 'unpack') {
    const unzip = zlib.createUnzip()
    const source = fs.createReadStream(file)
    const destination = fs.createWriteStream(file.replace('.gz', ''))

    await promisify(stream.pipeline)(source, unzip, destination)
  } else {
    console.error('Invalid command')
  }
}

main()
