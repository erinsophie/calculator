

const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const clearBtn = document.querySelector('.clear');
const clearAllBtn = document.querySelector('.clear-all');
const decimalBtn = document.querySelector('.decimal');
const equalsBtn = document.querySelector('.equals');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');


// EVENT LISTENERS 

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
      const number = button.dataset.number;
      console.log(number);
   });
});

operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
      const operator = button.id;
      console.log(operator);
    });
  });



// BASIC OPERATOR FUNCTIONS

const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};


const operate = (operator, a, b) => {
    switch(operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiply(a, b);
      case "÷":
        return divide(a, b);
     default: 
       return "Invalid input";
    }
};

