class Calculator {
  _MAX_DIGITS = 15;
  _operation;
  _previousValue;
  _currentValue;

  // Keys
  numberKeys = document.querySelectorAll('.key--number');
  operationKeys = document.querySelectorAll('.key--operation');
  equalsKey = document.querySelector('.key--equals');
  deleteKey = document.querySelector('.key--delete');
  resetKey = document.querySelector('.key--reset');

  // Display screen
  _displayResult = document.querySelector('.calculator__result');
  _displayOperand = document.querySelector('.calculator__operand');

  constructor() {
    this.clear();
  }

  clear() {
    this._currentValue = '';
    this._previousValue = '';
    this._operation = undefined;
    this._displayResult.textContent = '0';
  }

  delete() {
    this._currentValue = this._currentValue.toString().slice(0, -1);
  }

  insertNumber(number) {
    if (number === '.' && this._currentValue.includes('.')) return;
    if (this._currentValue.length >= this._MAX_DIGITS) return;
    this._currentValue = this._currentValue.toString() + number.toString();
  }

  compute() {
    let result;
    const previous = parseFloat(this._previousValue);
    const current = parseFloat(this._currentValue);

    if (isNaN(previous) || isNaN(current)) return;

    switch (this._operation) {
      case '+':
        result = previous + current;
        break;
      case '−':
        result = previous - current;
        break;
      case '×':
        result = previous * current;
        break;
      case '÷':
        result = previous / current;
        break;
      default:
        return;
    }

    this._currentValue = result;
    this._previousValue = '';
    this._operation = undefined;
  }

  updateOperation(operation) {
    if (this._currentValue === '') return;
    if (this._previousValue !== '') {
      this.compute();
    }

    this._operation = operation;
    this._previousValue = this._currentValue;
    this._currentValue = '';
  }

  convertDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this._displayResult.textContent = this.convertDisplayNumber(this._currentValue);
    if (this._operation) {
      this._displayOperand.textContent = `
        ${this.convertDisplayNumber(this._previousValue)} ${this._operation}`;
    } else {
      this._displayOperand.textContent = '';
    }
  }
}

export const calculator = new Calculator();
