const fs = require('fs');
const path = require('path');
const bench = require('./bench');

const implementations = {
  js_topWord: require('./top_word'),
  js_fibonacci: require('./fibonacci'),
  rust: require('../native')
};

const DATA = path.resolve(__dirname, '../data');

const string = fs.readFileSync(path.resolve(DATA, "quijote.txt"), 'utf8');
const buffer = fs.readFileSync(path.resolve(DATA, "quijote.txt"));

// console.log(bench(() => {
//   return implementations.js_topWord.topWord(string);
// }));

// console.log(bench(() => {
//   return implementations.rust.top_word(buffer);
// }));

console.log(bench(() => {
  return implementations.js_fibonacci.fibonacci(40);
}));

console.log(bench(() => {
  return implementations.rust.fibonacci(40);
}));
