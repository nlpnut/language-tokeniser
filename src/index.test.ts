import { LanguageTokeniser } from './index';

test('basic tokenisation of words', () => {
    const tokeniser = new LanguageTokeniser();

    const result = tokeniser.process('the cat sat on the mat');

    expect(result.tokens.length).toBe(11);
});

test('letter-digit digit-letter counting', () => {
    const tokeniser = new LanguageTokeniser();

    const result = tokeniser.process('ab34cd56 <- this is a reference');

    expect(result.tokens[0].letterDigitSwapCount).toBe(3);
});
