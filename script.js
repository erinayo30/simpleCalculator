// Basic Mathematical Operations
const calculator = document.getElementById("calculator");
const displayCurrent = document.getElementById("current-operand");
const displayPrevious = document.getElementById("previou-operand");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const dotbtn = document.getElementById("dot");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
equalsBtn.addEventListener("click", compute);
dotbtn.addEventListener("click", appendDot);

let currentOperand = "";
let previousOperand = "";
let operation = null;

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOperation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;

    case "√":
      computation = Math.sqrt(current);
      break;
    case "^":
      computation = Math.pow(prev, current);
      break;
    case "%":
      computation = (prev / 100) * current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
  updateDisplay();
}
function updateDisplay() {
  document.getElementById("current-operand").innerText = currentOperand;
  document.getElementById("previous-operand").innerText =
    previousOperand + "" + (operation || "");
}
function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  updateDisplay();
}
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

function appendDot() {
  if (currentOperand.includes(".")) return;
  if (currentOperand === "") currentOperand = "0";
  currentOperand += ".";
  updateDisplay();
}

// Advance Mathematical Operations
document.addEventListener("keydown", (event) => {
  if (event.key === ".") appendDot();
  if (event.key === " Enter" || event.key === "=") compute();
  if (event.key === "Backspace ") deleteNumber();
  if (event.key === "Escape") clear();

  updateDisplay();
});

let memoryValue = 0;
function memoryAdd() {
  memoryValue += parseFloat(currentOperand);
}

function memorySubtract() {
  memoryValue -= parseFloat(currentOperand);
}

function memoryRecall() {
  currentOperand = memoryValue.toString();
  updateDisplay();
}
function memoryClear() {
  memoryValue = 0;
}
