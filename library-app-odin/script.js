class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        const readStatus = this.read ? "Already read" : "Not read yet";
        return `${this.title} by ${this.author} has ${this.pages}. ${readStatus}`;
    }
}

// Create an array:
const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);  //create an obj instance
    myLibrary.push(newBook); //push it into the array
} 

// example of the call:
addBookToLibrary("The Hobbit", "J. Tolkien", 295, false);
console.log(myLibrary);