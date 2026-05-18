const container = document.getElementById("container");
const btn = document.getElementById("resizeBtn");

function createGrid(size) {
    //cleaning the container
    container.innerHTML = "";

    const squareSize = 960 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        //color & opacity changing Event Listener
        square.addEventListener("mouseenter", () => {
            let opacity = Number(square.dataset.opacity) || 0;

            if (opacity < 1) {
                opacity += 0.1;
            }

            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

            square.dataset.opacity = opacity;
        });

        container.appendChild(square);
    }
}

function askSize() {
    let size = prompt("Grid size (max 100):");
    size = Number(size);

    if (!size || size < 1) return;
    if (size > 100) size = 100;

    createGrid(size);
}

btn.addEventListener("click", askSize);

//starting grid : 
createGrid(16);
