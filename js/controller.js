import { theme } from './theme.js';
import { calculator } from './calculator.js';

theme.loadTheme();

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
  calculator.compute();
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
