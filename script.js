const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");


let currentNumber = "";
let firtsOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
    return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }


    updateResult();
}


function setOperator(newOperator) {
    if (currentNumber) {
        calculate();
            
     firtsOperand = parseFloat(currentNumber.replace(",", "."));
     currentNumber = "";
    }
    
    operator = newOperator;
}

function calculate () {
    if (operator === null || firtsOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firtsOperand + secondOperand;
            break;
        case "-":
            resultValue = firtsOperand - secondOperand;
            break;
        case "×":
            resultValue = firtsOperand * secondOperand;
            break;
        case "÷":
            resultValue = firtsOperand / secondOperand;
            break;
        default:
            return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firtsOperand = null;
    restart = true;
    percentageValue = null;
    updateResult();
}

function clearCalculator() {
    currentNumber = "";
    firtsOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (firtsOperand || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "×", "÷"].includes(buttonText)) {
            setOperator (buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C") {
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (
                parseFloat(currentNumber || firtsOperand) * -1
            ).toString();
            updateResult();
        } else if (buttonText === "÷") {
            setPercentage();
        }

    });
})