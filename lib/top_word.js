module.exports = {
  topWord: text => sortByValue(wordsFrequency(getWords(text))).filter(w => w.length > 4)[0]
};

function getWords(text) {
  const re = /[A-zÀ-ú]+/g;
  return text.match(re);
}

function wordsFrequency(words) {
  return words.reduce((stats, word) => {
    if (stats.hasOwnProperty(word)) {
      stats[word] = stats[word] + 1;
    } else {
      stats[word] = 1
    }
    return stats;
  }, {});
}

function sortByValue(list) {
  return Object.keys(list).sort((a, b) => list[b] - list[a]);
}
