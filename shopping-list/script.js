const ul = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");


button.addEventListener("click", function(e) {
    //Stop form from refreshing page:
    e.preventDefault();

    //Save typed text, then clear input field:
    const currentValue = input.value;
    input.value = "";

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.textContent = currentValue;
    deleteBtn.textContent = `Delete`; 

    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    //Add item to visible list:
    ul.appendChild(li);

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });
    
    //Return cursor back to input field:
    input.focus();
})