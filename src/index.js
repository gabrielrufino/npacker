#!/usr/bin/env node

'use strict'

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const { promisify } = require('util')

const ArgumentRequiredException = require('./exceptions/ArgumentRequiredException')

async function main() {
  const [,, operation, file] = process.argv

  if (!operation) {
    throw new ArgumentRequiredException('operation')
  }

  if (!file) {
    throw new ArgumentRequiredException('file')
  }

  if (operation === 'pack') {
    const source = fs.createReadStream(file)
    const gzip = zlib.createGzip()
    const destination = fs.createWriteStream(`${file}.gz`)

    await promisify(stream.pipeline)(source, gzip, destination)
  } else if (operation === 'unpack') {
    const source = fs.createReadStream(file)
    const unzip = zlib.createUnzip()
    const destination = fs.createWriteStream(file.replace('.gz', ''))

    await promisify(stream.pipeline)(source, unzip, destination)
  } else {
    console.error('Invalid operation')
  }
}

main()
