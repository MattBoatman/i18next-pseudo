import { uglifiedAlphabet, vowels } from './utils';

export default class Pseudo {
  constructor({
    languageToPseudo = 'en',
    letterMultiplier = 2,
    repeatedLetters = vowels,
    uglifedLetterObject = uglifiedAlphabet,
    enabled = true,
  } = {}) {
    this.name = `pseudo`;
    this.type = `postProcessor`;
    this.options = {
      languageToPseudo: languageToPseudo,
      letterMultiplier: letterMultiplier,
      repeatedLetters: repeatedLetters,
      letters: uglifedLetterObject,
      enabled: enabled,
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
    return value
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
  }
}
