// Light/Dark theme
const themeToggler = document.querySelector(".themes__toggle");
themeToggler.addEventListener("click", function () {
  this.classList.toggle("themes__toggle--isActive");
});

// Calculater Logic

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateUI = (value) => {
  resultElement.textContent = !value ? "0" : value;
};

const numberBtnHandler = (value) => {
  if (value === "." && (!currentNumber || currentNumber.includes("."))) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateUI(currentNumber);
};

const resetBtnHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateUI(currentNumber);
};

const deleteBtnHandler = () => {
  currentNumber = currentNumber.slice(0, -1);
  updateUI(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateUI(storedNumber);
  }
};

const operationBtnHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;

  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    if (currentNumber) {
      executeOperation();
      storedNumber = resultElement.textContent;
    }
    operation = operationValue;
    currentNumber = "";
  }
};

const keysHandler = (key) => {
  key.addEventListener("click", () => {
    const type = key.dataset.type;

    if (type === "number") {
      numberBtnHandler(key.dataset.value);
    } else if (type === "operation") {
      switch (key.dataset.value) {
        case "c":
          resetBtnHandler();
          break;
        case "Backspace":
          deleteBtnHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationBtnHandler(key.dataset.value);
      }
    }
  });
};

keyElements.forEach((key) => keysHandler(key));

// Use Keyboard

const avaliableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const avaliableOperations = ["+", "-", "*", "/"];
const avaliableKeys = [
  ...avaliableNumbers,
  ...avaliableOperations,
  "Backspace",
  "Enter",
  "c",
];

window.addEventListener("keydown", (e) => {
  // keyboardWithoutHover(e.key);
  keyboardWithHover(e.key);
});

// const keyboardWithoutHover = (key) => {
//   if (avaliableNumbers.includes(key)) {
//     numberBtnHandler(key);
//   } else if (avaliableOperations.includes(key)) {
//     operationBtnHandler(key);
//   } else if (key === "Backspace") {
//     deleteBtnHandler();
//   } else if (key === "c") {
//     resetBtnHandler();
//   } else if (key === "Enter") {
//     executeOperation();
//   }
// };

const keyboardWithHover = (key) => {
  if (avaliableKeys.includes(key)) {
    const element = document.querySelector(`[data-value="${key}"]`);

    element.classList.add("hover");
    element.click();
    setTimeout(() => element.classList.remove("hover"), 200);
  }
};
