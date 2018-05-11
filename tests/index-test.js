import expect from 'expect';

import Pseudo from 'src/index';
import { uglifiedAlphabet, vowels } from 'src/utils';

const translator = {
  language: 'en',
}
describe('Pseudo class check', () => {
  it('Has proper name, type, and default params', () => {
    const plugin = new Pseudo();
    expect(plugin.name).toEqual(`pseudo`);
    expect(plugin.type).toEqual(`postProcessor`);
    expect(plugin.options.enabled).toBeTruthy();
    expect(plugin.options.languageToPseudo).toEqual('en');
    expect(plugin.options.letterMultiplier).toEqual(2);
    expect(plugin.options.letters).toEqual(uglifiedAlphabet);
    expect(plugin.options.repeatedLetters).toEqual(vowels);
  });
});

describe('process', () => {
  it('if translator language and languageToPseudo dont match, return the original value', () => {
    const plugin = new Pseudo({
      languageToPseudo: 'es'
    });
    expect(plugin.process('Hello', '', {}, translator)).toEqual('Hello');
  });
  it('if enabled is false return value', () => {
    const plugin = new Pseudo({enabled: false});
    expect(plugin.process('Hello', '', {}, translator)).toEqual('Hello');
  });
  it('if translator language and languageToPseudo do match, return the pseudolocalized value', () => {
    const plugin = new Pseudo();
    expect(plugin.process('Hello', '', {}, translator)).toEqual('Ḥḛḛḽḽṓṓ');
  });
  it('pseudolocalize a string and ignore non standard characters', () => {
    const plugin = new Pseudo();
    expect(plugin.process('Hel>l<o', '', {}, translator)).toEqual('Ḥḛḛḽ>ḽ<ṓṓ');
  });
  it('pseudolocalize a string but ignore interpolation', () => {
    const plugin = new Pseudo();
    expect(plugin.process('You changed the language {{count}} times', '', {}, translator)).toEqual('ŶŶṓṓṵṵ ͼḥααṇḡḛḛḍ ţḥḛḛ ḽααṇḡṵṵααḡḛḛ {{count}} ţḭḭṃḛḛṡ');
  });
  it('repeat the repeatLetters(vowels) 4 times to match passed in param', () => {
    const plugin = new Pseudo({letterMultiplier: 4});
    expect(plugin.process('Boat', '', {}, translator)).toEqual('βṓṓṓṓααααţ');
  });

});
