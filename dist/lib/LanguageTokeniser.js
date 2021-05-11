"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageTokeniser = void 0;
var LanguageToken_1 = require("./LanguageToken");
var LanguageTokeniserResult_1 = require("./LanguageTokeniserResult");
var digits = '0123456789';
var lowLevelTokenType = {
    word: "word",
    whitespace: 'whitespace',
    control: 'control',
    symbol: 'symbol' // everything else eg - / \ @ ' 
};
var LanguageTokeniser = /** @class */ (function () {
    function LanguageTokeniser() {
    }
    LanguageTokeniser.prototype.process = function (text) {
        var tokens = [];
        var index = 0;
        while (index < text.length) {
            var token = this.processFromNewToken(index, tokens, text);
            token.text = text.substring(token.startIndex, token.endIndex + 1);
            index = token.endIndex + 1;
        }
        var result = new LanguageTokeniserResult_1.LanguageTokeniserResult(tokens);
        return result;
    };
    LanguageTokeniser.prototype.isDigit = function (character) {
        return digits.includes(character);
    };
    LanguageTokeniser.prototype.isLetter = function (character) {
        return character.toLowerCase() != character.toUpperCase();
    };
    LanguageTokeniser.prototype.processFromNewToken = function (characterIndex, tokens, text) {
        var character = text[characterIndex];
        if (this.isLetter(character)) {
            var token = new LanguageToken_1.LanguageToken();
            token.startIndex = characterIndex;
            token.lowLevelType = lowLevelTokenType.word;
            tokens.push(token);
            return this.processWord(characterIndex + 1, token, tokens, text, true);
        }
        else if (this.isDigit(character)) {
            var token = new LanguageToken_1.LanguageToken();
            token.startIndex = characterIndex;
            token.lowLevelType = lowLevelTokenType.word;
            tokens.push(token);
            return this.processWord(characterIndex + 1, token, tokens, text, false);
        }
        else if (character == ' ' || character == '\t') {
            var token = new LanguageToken_1.LanguageToken();
            token.startIndex = token.endIndex = characterIndex;
            token.lowLevelType = lowLevelTokenType.whitespace;
            tokens.push(token);
            return token;
        }
        else { // its a 'symbol'
            var token = new LanguageToken_1.LanguageToken();
            token.startIndex = token.endIndex = characterIndex;
            token.lowLevelType = lowLevelTokenType.symbol;
            tokens.push(token);
            return token;
        }
    };
    LanguageTokeniser.prototype.processWord = function (characterIndex, currentToken, tokens, text, lastWasLetter) {
        if (characterIndex < text.length) {
            var character = text[characterIndex];
            if (this.isDigit(character)) {
                if (lastWasLetter) {
                    currentToken.letterDigitSwapCount++;
                }
                return this.processWord(characterIndex + 1, currentToken, tokens, text, false);
            }
            else if (this.isLetter(character)) {
                if (!lastWasLetter) {
                    currentToken.letterDigitSwapCount++;
                }
                return this.processWord(characterIndex + 1, currentToken, tokens, text, true);
            }
            else { // Not a letter or digit so the word is over
                currentToken.endIndex = characterIndex - 1;
                return currentToken;
            }
        }
        else {
            currentToken.endIndex = text.length - 1;
        }
        return currentToken;
    };
    return LanguageTokeniser;
}());
exports.LanguageTokeniser = LanguageTokeniser;
//# sourceMappingURL=LanguageTokeniser.js.map