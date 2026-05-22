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

function operate(oper, num1, num2) {
    if (oper === "" || num1 === "" || num2 === "") {
        return `Won't happen.`;
    }
    
    num1 = Number(num1);
    num2 = Number(num2);

    if (oper === "+") return add(num1, num2);
    if (oper === "-") return subtract(num1, num2);
    if (oper === "*") return multiply(num1, num2);
    if (oper === "/") return divide(num1, num2);

    return "Unknown operator.";
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");

//Do we have the number before math sign, or after math sign?:
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clickedNum = button.textContent;
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
    //Make sure we have all 3 pcs before calc-ng:
    if (num1 !== "" && oper !== "" && num2 !== "") {
        const result = operate(oper, num1, num2);
        display.textContent = result; 
        //2. Update memory so user can chain next calc-s:
        num1 = result.toString();
        oper = "";
        num2 = "";
    }
})

// The clear, C
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    num1 = "";
    oper = "";
    num2 = "";
    display.textContent = "0";
});