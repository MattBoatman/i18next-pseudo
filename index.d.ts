declare module "i18next-pseudo" {
  import { PostProcessorModule } from "i18next";

  interface Options {
    enabled?: boolean;
    languageToPseudo?: string;
    letterMultiplier?: number;
    letters?: Record<string, string>;
    repeatedLetters?: Array<string>;
    uglifedLetterObject?: Record<string, string>;
    uglifyHTMLTags?: boolean;
    wrapped?: boolean;
  }

  interface Pseudo extends PostProcessorModule {
    configurePseudo(options: Options): void;
    options: Options;
    new (): any;
  }

  class Pseudo {
    constructor(options: Options);

    name: string;
  }

  export = Pseudo;
}
