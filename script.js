
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

//WHEN A BUTTON IS CLICKED, ASSIGN THE APPROPRIATE NUMEBR / OPERATION TO IT


function appendNumber(number) {
    if (calculator.currentOperand === '0') {
        calculator.currentOperand = number;
     } else {
        calculator.currentOperand += number;
     };
      updateDisplay();
};

function setOperation(operation) {
    calculator.operation = operation;
    calculator.previousOperand = `${calculator.currentOperand} ${calculator.operation}`;
    calculator.currentOperand = '';
    updateDisplay();
};

// CLEAR SCREEN

function clear() {
    calculator.currentOperand = calculator.currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function allClear() {
    calculator.currentOperand = '0';
    calculator.previousOperand = '';
    updateDisplay();
}






// OPERATOR FUNCTIONS

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

