const ul = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", function(e) {
    e.preventDefault();
    const currentValue = input.value;
    input.value = "";

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.textContent = currentValue;
    deleteBtn.textContent = `Delete`; 

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });
    
    input.focus();
})