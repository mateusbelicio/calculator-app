class Calculator {
  _MAX_DIGITS = 15;
  _operation;
  _previousValue;
  _currentValue;
  _isAfterEqualsPressed = false;

  // Keys
  numberKeys = document.querySelectorAll('.key--number');
  operationKeys = document.querySelectorAll('.key--operation');
  equalsKey = document.querySelector('.key--equals');
  deleteKey = document.querySelector('.key--delete');
  resetKey = document.querySelector('.key--reset');

  // Display screen
  _currentElDisplay = document.querySelector('.calculator__result');
  _previusElDisplay = document.querySelector('.calculator__operand');

  constructor() {
    this.clear();
  }

  clear() {
    this._currentValue = '0';
    this._previousValue = '';
    this._operation = undefined;
  }

  delete() {
    if (!this._isAfterEqualsPressed)
      this._currentValue = this._currentValue.toString().slice(0, -1);
    else {
      this._currentValue = '0';
      this._isAfterEqualsPressed = false;
    }
  }

  insertNumber(number) {
    if (number === '.' && this._currentValue.toString().includes('.') && !this._isAfterEqualsPressed) return;
    if (this._currentValue.length >= this._MAX_DIGITS) return;

    if (this._isAfterEqualsPressed) {
      this._currentValue = number;
      this._isAfterEqualsPressed = false;
    } else {
      this._currentValue = this._currentValue.toString() + number.toString();
    }
  }

  compute(equalsKeyPressed = false) {
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
    this._isAfterEqualsPressed = equalsKeyPressed;
  }

  updateOperation(operation) {
    if (this._currentValue === '') return;
    if (this._operation && this._currentValue === '0') { 
      this._operation = operation;
      return;
    }
    if (this._previousValue !== '') this.compute();
    
    this._operation = operation;
    this._previousValue = this._currentValue;
    this._currentValue = '0';
  }

  convertDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '0';
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
    this._currentElDisplay.textContent = this.convertDisplayNumber(this._currentValue);
    if (this._operation) {
      this._previusElDisplay.textContent = `
        ${this.convertDisplayNumber(this._previousValue)} ${this._operation}`;
    } else {
      this._previusElDisplay.textContent = '';
    }
  }
}

export const calculator = new Calculator();
