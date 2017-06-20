function topWord(text) {
  const re = /[A-zÀ-ú]+/g;
  const words = text.match(re);
  const stats = {};
  let currentMax = 0;
  let currentWord = '';
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
      stats[word] = (stats[word] || 0) + 1;
      if (word.length > 4 && stats[word] > currentMax) {
        currentMax = stats[word];
        currentWord = word;
      }
  }
  return currentWord;
}

module.exports = { topWord };
