'use strict'

module.exports = class ArgumentRequiredException extends Error {
  constructor(argument) {
    super(`Argument ${argument} is required`)
    this.name = ArgumentRequiredException.name
  }
}
