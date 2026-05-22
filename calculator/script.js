function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return `Won't happen.`;
    return a / b;
}

let num1 = "";
let oper = "";
let num2 = "";
let isFinished = false; // Tracks if just solved an equation

function operate(oper, num1, num2) {
    if (oper === "" || num1 === "" || num2 === "") {
        return `Won't happen.`;
    }
    
    num1 = Number(num1);
    num2 = Number(num2);
    let result;

    if (oper === "+") result = add(num1, num2);
    else if (oper === "-") result = subtract(num1, num2);
    else if (oper === "*") result = multiply(num1, num2);
    else if (oper === "/") result = divide(num1, num2);
    else return "Unknown operator.";

    //If the result has decimals, round to 4 dec.
    if (typeof result === "number" && !Number.isInteger(result)) {
        return Math.round(result * 10000) / 10000;
    }

    return result;
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");

//Do we have the number before math sign, or after math sign?:
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clickedNum = button.textContent;
        
        //If a prev calc-n just ended, reset all for a new one
        if (isFinished) {
            num1 = "";
            isFinished = false;
        }

        if (oper === "") {
            num1 += clickedNum;
            display.textContent = num1;
        } else {
            num2 += clickedNum;
            display.textContent = num2;
        }
    });
});

// Operators and chaining evaluations
const operButtons = document.querySelectorAll(".operator");
operButtons.forEach(button => {
    button.addEventListener("click", () => {
            // If we've a full equation waiting, calc it rn
            if (num1 !== "" && num2 !== "") {
                const result = operate(oper, num1, num2);
                display.textContent = result;
                num1 = result.toString();
                num2 = "";
            }

            // Save the +, -, *, / user just clicked.
            if (num1 !== "") {
            oper = button.textContent;
            }
        }
    });
});

// The result, =
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
    //See if we've all 3 pcs before calc-ng:
    if (num1 !== "" && oper !== "" && num2 !== "") {
        const result = operate(oper, num1, num2);
        display.textContent = result; 
        //2. Update memory so user can chain next calc-s:
        num1 = result.toString();
        oper = "";
        num2 = "";
        isFinished = true; // Tell calc problem's solved.
    }
});

// The clear, C
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    num1 = "";
    oper = "";
    num2 = "";
    display.textContent = "0";
});