"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommentText = validateCommentText;
function validateCommentText(text) {
    if (!text || text.length > 1000) {
        return false;
    }
    const asciiRegex = /^[\x00-\x7F]*$/;
    return asciiRegex.test(text);
}
