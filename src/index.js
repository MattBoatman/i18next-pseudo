import { uglifiedAlphabet, vowels, stringWrapper } from './utils';

export default class Pseudo {
  constructor({
    languageToPseudo = 'en',
    letterMultiplier = 2,
    repeatedLetters = vowels,
    uglifedLetterObject = uglifiedAlphabet,
    wrapped = false,
    enabled = true,
    uglifyHTMLTags = true
  } = {}) {
    this.name = `pseudo`;
    this.type = `postProcessor`;
    this.options = {
      languageToPseudo,
      letterMultiplier,
      wrapped,
      repeatedLetters,
      letters: uglifedLetterObject,
      enabled,
      uglifyHTMLTags
    }
  }

  configurePseudo(options) {
    this.options = { ...this.options, ...options}
  }

  process(value, key, options, translator) {
    if ((translator.language && this.options.languageToPseudo !== translator.language) || !this.options.enabled) {
      return value;
    }
    let curlyBracketCount = 0;
    let angleBracketCount = 0;
    const processedValue = value
      .split('')
      .map(letter => {
        switch (letter) {
          case '}': curlyBracketCount--; return letter;
          case '{': curlyBracketCount++; return letter;
          case '>': angleBracketCount--; return letter;
          case '<': angleBracketCount++; return letter;
        }

        if (curlyBracketCount === 2) return letter;
        if (angleBracketCount > 0 && !this.options.uglifyHTMLTags) return letter;

        return this.options.repeatedLetters.indexOf(letter) !== -1
          ? this.options.letters[letter].repeat(this.options.letterMultiplier)
          : this.options.letters[letter] || letter;
      })
      .join('');
    return stringWrapper({shouldWrap: this.options.wrapped, string: processedValue })
  }
}
