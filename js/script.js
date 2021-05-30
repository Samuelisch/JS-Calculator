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