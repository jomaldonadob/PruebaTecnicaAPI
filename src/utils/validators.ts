export function validateCommentText(text: string): boolean {
    if (!text || text.length > 1000) {
      return false;
    }
  
    const asciiRegex = /^[\x00-\x7F]*$/;
    return asciiRegex.test(text);
  }