function fibonacci(num) {
  if (num <= 2) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

// function fibonacci(num, memo) {
//   memo = memo || {};

//   if (memo[num]) return memo[num];
//   if (num <= 1) return 1;

//   return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
// }

module.exports = { fibonacci };
