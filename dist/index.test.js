"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
test('basic tokenisation of words', function () {
    var tokeniser = new index_1.LanguageTokeniser();
    var result = tokeniser.process('the cat sat on the mat');
    expect(result.tokens.length).toBe(11);
});
test('letter-digit counting', function () {
    var tokeniser = new index_1.LanguageTokeniser();
    var result = tokeniser.process('ab34cd56 <- this is a reference');
    expect(result.tokens[0].letterDigitSwapCount).toBe(3);
});
//# sourceMappingURL=index.test.js.map