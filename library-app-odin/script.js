// Create an array:
const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);  
    myLibrary.push(newBook); 
} 

function displayBooks() {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", book.id);

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read already" : "Not read"}</p>
        `;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Remove";
        delBtn.onclick = () => {
            const index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            displayBooks();
        };

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.onclick = () => {
            book.toggleRead(); 
            displayBooks();
        };

        card.appendChild(toggleBtn);
        card.appendChild(delBtn);
        grid.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "J. Tolkien", 295, false);
addBookToLibrary("1984", "G. Orwell", 328, true);
addBookToLibrary("1984", "G. Orwell", 328, true);

displayBooks();

const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');

document.getElementById('open-form').addEventListener('click', () => dialog.showModal());
document.getElementById('close-form').addEventListener('click', () => dialog.close());

form.addEventListener("submit", (e)=> {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');

    const read = form.elements['read'].checked;
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset();
    dialog.close();
});
