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