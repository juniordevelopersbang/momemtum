const calculator = {
  plus: function(a, b) {
    return a + b;
  },

  minus: function(a, b) {
    return a - b;
  },

  mulifly: function(a, b) {
    return a * b;
  },

  divide: function(a, b) {
    return a / b;
  }
};

const plus = calculator.plus(5, 5);
console.log(plus);

const minus = calculator.minus(5, 5);
console.log(minus);

const mulifly = calculator.mulifly(5, 5);
console.log(mulifly);

const divide = calculator.divide(5, 5);
console.log(divide);
