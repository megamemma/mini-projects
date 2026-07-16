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

const theHobbit = new Book ("The Hobbit", "J Tolkien", 295, false);
console.log(theHobbit);