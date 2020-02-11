declare module "i18next-pseudo" {
  import { PostProcessorModule } from "i18next";

  export interface Options {
    languageToPseudo: string;
    letterMultiplier: number;
    repeatedLetters: Array<string>;
    letters: Record<string, string>;
    wrapped: boolean;
    enabled: boolean;
  }

  export interface InitOptions extends Partial<Omit<Options, "letters">> {
    uglifedLetterObject?: Record<string, string>;
  }

  export interface Pseudo extends PostProcessorModule {
    configurePseudo(options: Partial<Options>): void;
    options: Options;
    new (): any;
  }

  class Pseudo {
    constructor(options: InitOptions);

    name: string;
  }
}
