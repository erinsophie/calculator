
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
window.addEventListener('keydown', keyboardSupport);


//KEEP TRACK OF THE STATE OF THE CALCULATOR

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
    if(exceedsLimit(calculator.currentOperand)) return;
    if(calculator.previousOperand.includes("=")) return;

    if (number === "." && calculator.currentOperand.includes(".") || number === "." && calculator.currentOperand === '') return;

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

//LIMIT CHARACTER INPUT 

function exceedsLimit(digit) {
    if (digit.length >= 18) {
       return true;
    }
};

//SET OPERATION 

function setOperation(operation) {
    if (calculator.currentOperand === '0') return;
    if (calculator.operation !== undefined && calculator.currentOperand === '') return;
    calculator.operation = operation;
    calculator.previousOperand = `${calculator.currentOperand} ${calculator.operation}`;
    calculator.currentOperand = '';
    updateDisplay();
};

// CLEAR SCREEN

function clear() {
    if (calculator.currentOperand === '0' || calculator.currentOperand === '') return;
    if(calculator.previousOperand.includes("=")) return;
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

    if(previous.toString().length >= 12 || current.toString().length >= 12) {
        calculator.previousOperand = `${previous} ${calculator.operation}\n${current} =`;
    } else {
        calculator.previousOperand = `${previous} ${calculator.operation} ${current} =`;
    };

    calculator.operation = undefined;
    updateDisplay();
};


// if result has more than 10 digits before decimal point convert to exponential notation with a precision of 6 decimal places 
// otherwise reduce any other result that is under that threshold but includes a decimal place to 2 decimal places 
// if there is no decimal in the result then display the result as normal

function formatNumber(number) {
  const threshold = 1e10; 
  if (Math.abs(number) >= threshold) {
    return number.toExponential(6);
  } else {
     if (number.toString().includes('.')) {
     return number.toFixed(2); 
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


// KEYBOARD SUPPORT 

function keyboardSupport(e) {
   if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
   if (e.key === ".") appendNumber(e.key);
   if (e.key === "Backspace") clear();
   if (e.key === "Escape") allClear();
   if (e.key === "Enter") evaluate();
   if (e.key === "=") evaluate();
   if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    setOperation(convertKeys(e.key));
   };
};

function convertKeys(key) {
    switch (key) {
        case "/":
            return "÷";
        case "+":
            return "+";
        case "-":
            return "-";
        case "*":
            return "x";
    };
};
