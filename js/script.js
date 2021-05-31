const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.screen');

//flags for calculator operators
let isPositive = true;
let operatorActive = false;

//initial value
let storeOperator = '';
let firstValue = undefined;
let secondValue = undefined;
let displayValue = '';
let value = 0;
display.textContent = value;

//Calculator functions
const plus = (x, y) => {
    return x + y;
}

const minus = (x, y) => {
    return x - y;
}

const multiply = (x, y) => {
    if (x == 0 || y == 0) {
        return 0;
    }
    return limit(x * y);
}

const divide = (x, y) => {
    if (x == 0 || y == 0) {
        return 'ERROR';
    }
    let num = x / y;
    return limit(num);
}

function limit(num) {
    const limit = 10;
    const integerLength = Math.floor(num).toString().length;
    const decimalLength = limit - integerLength - 1;
    return Math.round(num * Math.pow(10, decimalLength)) / Math.pow(10, decimalLength);
}

function calculate(first, second, func) {
    let result = func(first, second);
    let compressResult = shorten(result); //check if result length too long, shorten it if possible;
    displayValue = compressResult;
    display.textContent = compressResult;
    firstValue = result;
}

function shorten(num) {
    let exp = 0;
    if (num > 999999999) {
        while (num > 9) {
            exp++;
            num /= 10;
        }
        return `${num}E${exp}`;
    } else {
    return num;
    }
}

//event handlers
function overLimit() {
    return (displayValue.length >= 9);
}

function handleTopBtn(e) {
    switch (e.getAttribute('value')) {
        case 'clear': //reset everything in the calculator
            storeOperator = '';
            firstValue = undefined;
            secondValue = undefined;
            displayValue = '';
            value = 0;
            display.textContent = value;
            isPositive = true;
            operatorActive = false;
            break;
        case 'sign':
            displayValue = -Math.abs(parseFloat(displayValue));
            display.textContent = displayValue;
            break;
        case 'percent':
            displayValue = `${parseFloat(displayValue) / 100}`;
            display.textContent = displayValue;
            break;
    }
};

function handleNum(e) {
    if (operatorActive) {
        operatorActive = false;
        displayValue = ''
    }
    let btnValue = e.getAttribute('value');
    if (overLimit(displayValue)) {
        display.textContent = displayValue;
        return; //stops if over num limit
    }
    displayValue += btnValue;
    display.textContent = displayValue;
}

function determineAction() {
    switch (storeOperator) {
        case 'divide':
            calculate(firstValue, secondValue, divide);
            break;
        case 'multiply':
            calculate(firstValue, secondValue, multiply);
            break;
        case 'minus':
            calculate(firstValue, secondValue, minus);
            break;
        case 'plus':
            calculate(firstValue, secondValue, plus);
            break;
    }
}

function handleOperator(e) {
    if (firstValue == undefined) {
        storeOperator = e.getAttribute('value');
        operatorActive = true;
        firstValue = parseFloat(displayValue) || 0;
    } else {
        if (secondValue == undefined) {
            secondValue = parseFloat(displayValue);
        }
        if (e.getAttribute('value') == 'equal') {
            determineAction();
        } else {
            determineAction();
            storeOperator = e.getAttribute('value');
        }
        operatorActive = true;
    }
}

function handleClick(e) {
    if (e.target.classList.contains('top')) {
        handleTopBtn(e.target);
    }
    if (e.target.classList.contains('num')) {
        console.log(e.target);
        handleNum(e.target);
    }
    if (e.target.classList.contains('operator')) {
        handleOperator(e.target);
    }
}

function handleKeyPress(e) {
    let button = document.querySelector(`.btn[data-key="${e.keyCode}"]`);
    if (!button) return; //returns if no match
    if (button.classList.contains('top')) {
        handleTopBtn(button);
    }
    if (button.classList.contains('num')) {
        handleNum(button);
    }
    if (button.classList.contains('operator')) {
        handleOperator(button);
    }
    
}

buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
window.addEventListener('keydown', handleKeyPress);