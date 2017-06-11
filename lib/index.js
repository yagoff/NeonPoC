const fs = require('fs');
const path = require('path');
const bench = require('./bench');

const implementations = {
  js: require('./top_word'),
  rust: require('../native')
};

const DATA = path.resolve(__dirname, '../data');

const string = fs.readFileSync(path.resolve(DATA, "quijote.txt"), 'utf8');
const buffer = fs.readFileSync(path.resolve(DATA, "quijote.txt"));

console.log(bench(() => {
  return implementations.js.topWord(string);
}));

console.log(bench(() => {
  return implementations.rust.top_word(buffer);
}));
