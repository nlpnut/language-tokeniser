import { LanguageTokeniserResult } from './LanguageTokeniserResult';
export declare class LanguageTokeniser {
    process(text: string): LanguageTokeniserResult;
    private isDigit;
    private isLetter;
    private processFromNewToken;
    private processWord;
}
