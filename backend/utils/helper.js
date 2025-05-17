function extractJSON(text) {
  const firstBrace = text.indexOf('{');
  if (firstBrace === -1) return null;

  let stack = [];
  for (let i = firstBrace; i < text.length; i++) {
    if (text[i] === '{') stack.push('{');
    else if (text[i] === '}') stack.pop();

    if (stack.length === 0) {
      // Found matching closing brace
      return text.substring(firstBrace, i + 1);
    }
  }

  return null; // No valid JSON found
}

module.exports = { extractJSON };
