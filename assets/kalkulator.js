const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  isWaitForSecondNumber: false,
};

function updateDisplay() {
  document.querySelector('.result').innerText = calculator.displayNumber;
  calculator.isWaitForSecondNumber = false;
}

function clear() {
  calculator.operator = null;
  calculator.displayNumber = '0';
  calculator.firstNumber = null;
  calculator.isWaitForSecondNumber = false;
}
function clear_entry() {
  console.table(calculator.displayNumber);
}
function inputNumber(number) {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = number;
  } else {
    calculator.displayNumber += number;
  }
}
function handleOperator(operator) {
  if (!calculator.isWaitForSecondNumber) {
    calculator.firstNumber = calculator.displayNumber;
    calculator.operator = operator;
    calculator.isWaitForSecondNumber = true;
    calculator.displayNumber = '0';
  } else {
    alert('Operator Sudah ditentukan !');
  }
}
function performCalculations() {
  if (calculator.displayNumber == null || calculator.operator == null) {
    alert('Operator belum ditentukan !');
  }
  let result = 0;
  if (calculator.operator === '+') {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else if (calculator.operator === '-') {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  } else if (calculator.operator === '÷') {
    result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
  } else if (calculator.operator === '×') {
    result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
  } else if (calculator.operator === '1/x') {
    result = 1 / parseInt(calculator.firstNumber);
  } else if (calculator.operator === '²') {
    result = parseInt(calculator.firstNumber) ** 2;
  } else if (calculator.operator === '√') {
    result = Math.sqrt(parseInt(calculator.firstNumber));
  } else if (calculator.operator === '%') {
    result = parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber);
  }
  const storage_calculator = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(storage_calculator);
  calculator.displayNumber = result;
  renderHistory();
}

const buttons = document.querySelectorAll('.button');
for (button of buttons) {
  button.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('clear')) {
      clear();
      updateDisplay();
      return;
    }
    if (target.classList.contains('clear-entry')) {
      clear_entry();
      updateDisplay();
      return;
    }
    if (target.classList.contains('equal')) {
      performCalculations();
      updateDisplay();
      return;
    }
    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }
    inputNumber(target.innerText);
    updateDisplay();
  });
}
