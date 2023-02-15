

const add = (a, b) => {
    let sum = a + b;
    return sum;
}

const subtract = (a, b) => {
    let sum = a - b;
    return sum;
}


const multiply = (a, b) => {
    let sum = a * b;
    return sum;
}


const divide = (a, b) => {
    let sum = a / b;
    return sum;
}


const operate = (operator, a, b) => {
    switch(operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        return divide(a, b);
     default: 
       return "Invalid input";
    }
};

console.log(operate("+", 5, 10));