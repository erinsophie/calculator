
const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const allClearBtn = document.querySelector('[data-all-clear]');
const currentDisplay = document.querySelector('[data-current-operand]');
const previousDisplay = document.querySelector('[data-previous-operand]');

// EVENT LISTENERS


numberBtn.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorBtn.forEach(button => button.addEventListener('click', () => setOperation(button.textContent)));
clearBtn.addEventListener('click', clear);
allClearBtn.addEventListener('click', allClear);
equalsBtn.addEventListener('click', evaluate);


//KEEP TRACK OF THE STATE OF THE CALCULATOR WITH CALCULATOR OBJECT 


const calculator = {
    currentOperand: '0',
    previousOperand: '',
    operation: undefined,
};

// UPDATE THE DISPLAY 


function updateDisplay() {
    currentDisplay.textContent = calculator.currentOperand;
    previousDisplay.textContent = calculator.previousOperand;
};

//WHEN A BUTTON IS CLICKED ASSIGN THE APPROPRIATE NUMEBR 
//DO NOT ALLOW USERS TO INPUT MORE THAN ONE DECIMAL POINT IF CURRENT OPERAND ALREADY INCLUDES ONE
//DO NOT ALLOW CHARACTERS TO EXCEED THE SCREEN SIZE


function appendNumber(number) {
    if(exceedsCurrent()) return;

    if (number === "." && calculator.currentOperand.includes(".")) return;

    if (calculator.currentOperand === "0" && number !== ".") {
        calculator.currentOperand = number;
    } else {
        if (calculator.currentOperand === "0" && number === ".") {
            calculator.currentOperand += number;
      } else {
            calculator.currentOperand += number;
          }
        }
    updateDisplay();
};

//LIMIT CURRENT CHARACTER INPUT 

function exceedsCurrent() {
    if (calculator.currentOperand.length >= 18) {
       return true;
    }
};

//SET OPERATION 


function setOperation(operation) {
    calculator.operation = operation;
    calculator.previousOperand = `${calculator.currentOperand} ${calculator.operation}`;
    calculator.currentOperand = '';
    updateDisplay();
};

// CLEAR SCREEN


function clear() {
    if (calculator.currentOperand === '0') return;
    if (calculator.currentOperand !== '0') {
        calculator.currentOperand = calculator.currentOperand.toString().slice(0, -1);
    }
    if (calculator.currentOperand.length < 1) {
        calculator.currentOperand = '0';
    };
    updateDisplay();
};

function allClear() {
    calculator.currentOperand = '0';
    calculator.previousOperand = '';
    updateDisplay();
};


// CALCULATE SUM WHEN EQUALS BUTTON IS CLICKED


function evaluate() {
    let result;
    const current = parseFloat(calculator.currentOperand);
    const previous = parseFloat(calculator.previousOperand);
    if (isNaN(current) || isNaN(previous) || !calculator.operation) {
      return;
    };
    result = operate(calculator.operation, previous, current);
    calculator.currentOperand = formatNumber(result);
    calculator.previousOperand = `${previous} ${calculator.operation} ${current} =`;
    calculator.operation = undefined;
    updateDisplay();
};

// Display large numbers using scientific notation 
// if result has more than 10 digits before decimal point convert to scientifc notation which displays 1 digit to 6 decimal places
// otherwise reduce any other result that is under that threshold but includes a decimal place to 2 decimal places 
// if there is no decimal in the result then display the result as normal

function formatNumber(number) {
  const threshold = 1e10; 
  if (Math.abs(number) >= threshold) {
    return number.toExponential(6); // 6 decimal places
  } else {
     if (number.toString().includes('.')) {
     return number.toFixed(2); // if result includes decimal point, round to 2 decimal places 
  } else {
    return number.toString();
   }
  }
};


// OPERATOR FUNCTIONS


const operate = (operator, a, b) => {
    switch(operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "x":
        return multiply(a, b);
      case "÷":
        return divide(a, b);
     default: 
       return "Invalid input";
    }
};


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




