const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.screen');

//flags for calculator operators
let isPositive = true;
let isDivide = false;
let isTimes = false;
let isMinus = false;
let isPlus = false;
let isCalculating = false;

//initial value
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
    return limit(x * y);
}

const divide = (x, y) => {
    if (x == 0 || y == 0) {
        console.log('ERROR!');
        return;
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

//event handlers
function handleTopBtn() {
    return;
};

function handleNum(e) {
    let btnValue = e.getAttribute('value');
    displayValue += btnValue;
    display.textContent = displayValue;
}

function handleOperator() {
    return;
}

function handleClick(e) {
    console.log(e.target);
    if (e.target.classList.contains('top')) {
        handleTopBtn();
    }
    if (e.target.classList.contains('num')) {
        handleNum(e.target);
    }
    else {
        handleOperator();
    }
}

function handleKeyPress(e) {
    return;
}

buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
    btn.addEventListener('keydown', handleKeyPress);
});