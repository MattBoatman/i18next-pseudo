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
    this.bracketCount = 0;
    this.languageToPseudo = languageToPseudo;
    this.letterMultiplier = letterMultiplier;
    this.repeatedLetters = repeatedLetters;
    this.letters = uglifedLetterObject;
    this.enabled = enabled;
  }

  process(value, key, options, translator) {
    if ((translator.language && this.languageToPseudo !== translator.language) || !this.enabled) {
      return value;
    }

    return value
      .split('')
      .map(letter => {
        if (letter === '}') {
          this.bracketCount = 0;
          return letter;
        }
        if (letter === '{') {
          this.bracketCount++;
          return letter;
        }
        if (this.bracketCount === 2) return letter;

        return this.repeatedLetters.indexOf(letter) !== -1
          ? this.letters[letter].repeat(this.letterMultiplier)
          : this.letters[letter] || letter;
      })
      .join('');
  }
}
