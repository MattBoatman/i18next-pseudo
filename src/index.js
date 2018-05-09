import { uglifiedAlphabet, vowels } from './utils';

export default class Pseudo {
  constructor(opts = {}) {
    this.name = `pseudo`;
    this.type = `postProcessor`;
    this.bracketCount = 0;
    this.languageToPseudo = opts.languageToPseudo || 'en';
    this.letterMultiplier = opts.letterMultiplier || 2;
    this.vowels = opts.repeatedLetterArray || vowels;
    this.letters = opts.uglifedLetterObject || uglifiedAlphabet;
  }

  process(value, key, options, translator) {
    if (this.languageToPseudo !== translator.language) {
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

        return this.vowels.indexOf(letter) !== -1
          ? this.letters[letter].repeat(this.letterMultiplier)
          : this.letters[letter] || letter;
      })
      .join('');
  }
}
