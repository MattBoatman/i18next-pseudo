import { uglifiedAlphabet, vowels, stringWrapper } from './utils';

export default class Pseudo {
  constructor({
    languageToPseudo = 'en',
    letterMultiplier = 2,
    repeatedLetters = vowels,
    uglifedLetterObject = uglifiedAlphabet,
    wrapped = false,
    enabled = true,
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
    }
  }

  configurePseudo(options) {
    this.options = { ...this.options, ...options}
  }

  process(value, key, options, translator) {
    if ((translator.language && this.options.languageToPseudo !== translator.language) || !this.options.enabled) {
      return value;
    }
    let bracketCount = 0;
    const processedValue = value
      .split('')
      .map(letter => {
        if (letter === '}') {
          bracketCount = 0;
          return letter;
        }
        if (letter === '{') {
          bracketCount++;
          return letter;
        }
        if (bracketCount === 2) return letter;

        return this.options.repeatedLetters.indexOf(letter) !== -1
          ? this.options.letters[letter].repeat(this.options.letterMultiplier)
          : this.options.letters[letter] || letter;
      })
      .join('');
    return stringWrapper({shouldWrap: this.options.wrapped, string: processedValue })
  }
}
