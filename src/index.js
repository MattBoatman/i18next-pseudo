export default class Pseudo {
  constructor(opts = {}) {
      this.name = `pseudo`;
      this.type = `postProcessor`;

  }

  process(value, key, options, translator) {
    console.log(value)
    console.log(key)
    console.log(options)
    console.log(translator)

    return value
  }
}