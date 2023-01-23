import { theme } from './theme.js';
import { calculator } from './calculator.js';

const mapKeys = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
}

theme.loadTheme();

// Controll UI events
calculator.numberKeys.forEach((key) =>
  key.addEventListener('click', function () {
    calculator.insertNumber(this.textContent);
    calculator.updateDisplay();
  })
);

calculator.operationKeys.forEach((key) =>
  key.addEventListener('click', function () {
    calculator.updateOperation(this.textContent);
    calculator.updateDisplay();
  })
);

calculator.equalsKey.addEventListener('click', function () {
  calculator.compute(true);
  calculator.updateDisplay();
});

calculator.resetKey.addEventListener('click', function () {
  calculator.clear();
  calculator.updateDisplay();
});

calculator.deleteKey.addEventListener('click', function () {
  calculator.delete();
  calculator.updateDisplay();
});

// Controll keyboard events
window.addEventListener('keydown', (event) => {
  if(!isNaN(event.key) || event.key === '.') {
    calculator.insertNumber(event.key);
    calculator.updateDisplay();
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    calculator.updateOperation(mapKeys[event.key]);
    calculator.updateDisplay();
  } else if(event.key === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  } else if(event.key === 'Enter') {
    calculator.compute(true);
    calculator.updateDisplay();
  } else if(['Delete', 'Backspace'].includes(event.key)) {
    calculator.delete();
    calculator.updateDisplay();
  } else {
    return;
  }
})

