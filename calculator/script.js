function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return `Won't happen.`;
    return a / b;
}

let prevInput = "";
let currInput = "";
let oper = "";
let isFinished = false;

function updateDisplay() {
    if (oper === "") {
        display.textContent = prevInput === "" ? "0" : prevInput;
    } else {
        display.textContent = currInput === "" ? "0" : currInput;
    }
}

function operate(oper, prevInput, currInput) {
    if (oper === "" || prevInput === "" || currInput === "") {
        return `Won't happen.`;
    }
    
    prevInput = Number(prevInput);
    currInput = Number(currInput);
    let result;

    if (oper === "+") result = add(prevInput, currInput);
    else if (oper === "-") result = subtract(prevInput, currInput);
    else if (oper === "*") result = multiply(prevInput, currInput);
    else if (oper === "/") result = divide(prevInput, currInput);
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
            prevInput = "";
            isFinished = false;
        }

        if (oper === "") {
            prevInput += clickedNum;
        } else {
            currInput += clickedNum;
        }

        updateDisplay();
    });
});

// Operators and chaining evaluations
const operButtons = document.querySelectorAll(".operator");
operButtons.forEach(button => {
    button.addEventListener("click", () => {
            // If we've a full equation waiting, calc it rn
            if (prevInput !== "" && currInput !== "") {
                const result = operate(oper, prevInput, currInput);
                display.textContent = result;
                prevInput = result.toString();
                currInput = "";
            }

            // Save the +, -, *, / user just clicked.
            if (prevInput !== "") {
            oper = button.textContent;
            isFinished = false; 
            }
        });
});

// The result, =
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
    //See if we've all 3 pcs before calc-ng:
    if (prevInput !== "" && oper !== "" && currInput !== "") {
        const result = operate(oper, prevInput, currInput);
        display.textContent = result; 
        //2. Update memory so user can chain next calc-s:
        prevInput = result.toString();
        oper = "";
        currInput = "";
        isFinished = true; // Tell calc problem's solved.
    }
});

// The clear, C
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    prevInput = "";
    oper = "";
    currInput = "";
    display.textContent = "0";
});

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
    //If user clicks "." right after "=", start a fresh num "0."

    if (isFinished) {
        prevInput = "0.";
        display.textContent = prevInput;
        isFinished = false;
        return;
    }

    if (oper === "") {
        // Only add "." if num1 doesn't alr have one.
        if (!prevInput.includes(".")) {
            if (prevInput === "") prevInput = "0"; //If empty, make it "0."
            prevInput += ".";
        }
    } else {
        if (!currInput.includes(".")) {
            if (currInput === "") currInput = "0";
            currInput += ".";
        }
    }

    updateDisplay();
});

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", () => {
    //If they click bckspc after an equation done, just stop:
    if (isFinished) return;

    if (oper === "") {
        //Modify num1
        prevInput = prevInput.slice(0, -1);
    } else {
        //Modify num2
        currInput = currInput.slice(0, -1);
    }

    updateDisplay();
})

// Keyboard actions. If project grows, target not the window, but the calc container directly (like C/c, -, .)
window.addEventListener("keydown", (event) => {    
    //numbers 0-9:
    if (event.key >= "0" && event.key <= "9") {
        //Find the digit btn which text matches pressed key:
        const digitBtn = Array.from(digitButtons).find(btn => btn.textContent === event.key);
        if (digitBtn) digitBtn.click();
    }

    //ops +-*/:
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        const operBtn = Array.from(operButtons).find(btn => btn.textContent === event.key);
        if (operBtn) operBtn.click();
    }

    // enter, =, backspace, clear, decimal...:
    if (event.key === "=" || event.key === "Enter") {
        event.preventDefault();
        equalsButton.click();
    }

    if (event.key === "Backspace") {
        backspaceButton.click();
    }

    if (event.key === "C" || event.key === "c") {
        clearButton.click();
    } 

    if (event.key === ".") {
        decimalButton.click();
    }


});