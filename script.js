let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    display.value = expression;
}

function appendOperator(op) {
    if (expression === '') return;
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '.'].includes(expression[expression.length - 1])) {
        expression = expression.slice(0, -1);
    }
    
    expression += op;
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    display.value = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression;
}

function calculate() {
    try {
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle floating point precision
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
    if (e.key === '.') appendOperator('.');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key.toLowerCase() === 'c') clearDisplay();
});