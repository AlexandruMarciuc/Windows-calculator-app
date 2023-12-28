"use strict";
// Define variables for input fields and buttons
const mainInput = document.getElementById("input1");
const secondaryInput = document.getElementById("input2");
const numbers = document.querySelectorAll(".numbers div:not(#clear)");
const clearButton = document.querySelector("#clear");
const resultButton = document.querySelector("#result");
const operators = document.querySelectorAll(".operators div");

//variables for keeping track of the numbers
let operator1 = "";
let operator2 = "";
let firstNumber = "";
let secondNumber = "";
let firstNumberPressed = true;
let decided = false;

//variables for keeping track of mathematical operations
let calculusDone = false;
let variable1 = false;
let variable2 = true;
let finalResult;

// Function to calculate the result of the first mathematical operation.
function calculate() {
  let first = Number(firstNumber);
  let second = Number(secondNumber);

  // Perform the operation based on operator1.
  switch (operator1) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "×":
      return first * second;
    case "÷":
      if (first && second === 0) {
        return "Cannot divide by zero";
      }
      return first / second;
    default:
      return "Error";
  }
}

// Function to calculate the result of the second mathematical operation.
function calculate2() {
  let first = Number(firstNumber);
  let second = Number(secondNumber);

  // Perform the operation based on operator1.
  switch (operator2) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "×":
      return first * second;
    case "÷":
      if (first && second === 0) {
        return "Cannot divide by zero";
      }
      return first / second;
    default:
      return "Error";
  }
}

// click event listeners for numbers
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    //checking if it's the first number to start the cycle
    if (firstNumberPressed) {
      firstNumber += number.textContent;
      mainInput.textContent = firstNumber;
    }

    //checking if it's the second number
    if (!firstNumberPressed) {
      secondNumber += number.textContent;
      mainInput.textContent = secondNumber;
      decided = true;
      console.log(decided);
    }
  });
});

//click event listeners for operator buttons
operators.forEach((op) => {
  op.addEventListener("click", () => {
    //if the second number is chosen store the operand in operator1
    if (!decided) {
      operator1 = op.textContent;
      secondaryInput.textContent = `${firstNumber} ${operator1}`;
      firstNumberPressed = false;
      console.log(operator1);
    }
    // switching the variables to do the mathematical operations
    if (decided && !variable1 && variable2) {
      let resultOfOperation = calculate();
      finalResult = resultOfOperation;
      operator2 = op.textContent;
      operator1 = "";
      calculusDone = true;
      variable1 = true;

      // Update secondaryInput with the new operator2
      secondaryInput.textContent = `${finalResult} ${operator2}`;
      mainInput.textContent = finalResult;
      firstNumber = finalResult;
      secondNumber = "";
    } else if (calculusDone) {
      let resultOfOperation = calculate2();
      finalResult = resultOfOperation;
      console.log(finalResult);
      operator1 = op.textContent;
      operator2 = "";
      calculusDone = false;
      variable1 = false;

      // Update secondaryInput with the new operator1
      secondaryInput.textContent = `${finalResult} ${operator1}`;
      mainInput.textContent = finalResult;
      firstNumber = finalResult;
      secondNumber = "";
    }
  });
});

// clear everyting to start over
clearButton.addEventListener("click", () => {
  operator1 = "";
  operator2 = "";
  firstNumber = "";
  secondNumber = "";
  firstNumberPressed = true;
  decided = false;

  calculusDone = false;
  variable1 = false;
  variable2 = true;
  finalResult;
  secondaryInput.textContent = "";
  mainInput.textContent = "0";
});

// display the entire operation
resultButton.addEventListener("click", () => {
  if (operator1) {
    let displayedResult = calculate();
    secondaryInput.textContent = `${firstNumber} ${operator1} ${secondNumber} ${"="}`;
    mainInput.textContent = `${displayedResult}`;
  }

  if (operator2) {
    let displayedResult1 = calculate2();
    secondaryInput.textContent = `${firstNumber} ${operator2} ${secondNumber} ${"="}`;
    mainInput.textContent = `${displayedResult1}`;
  }
});
