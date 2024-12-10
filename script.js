
const elements = {
    add: document.getElementById('addBook'),
    content: document.getElementById('content'),
    dialog: document.getElementById('userDialog'),
    form: document.getElementById('form'),
    submit: document.getElementById('submit'),
    cancel: document.getElementById('cancel'),
};

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = [
    new Book("The Wild Robot", "Peter Brown", 288, true),
    new Book("The Wild Robot Escape", "Peter Brown", 288, false),
];

const displayBooks = () => {
    elements.content.innerHTML = myLibrary
        .map(
            (book, index) => `
        <div class="card">
            <div class="card-details">
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
            </div>
            <div class="card-buttons">
                <button class="read" onclick="toggleRead(${index})">Toggle Read</button>
                <button class="delete" onclick="deleteBook(${index})">Delete</button>
            </div>
        </div>`
        )
        .join('');
};

const toggleRead = (index) => {
    myLibrary[index].toggleRead();
    displayBooks();
};

const deleteBook = (index) => {
    myLibrary.splice(index, 1);
    displayBooks();
};

elements.add.addEventListener('click', () => elements.dialog.showModal());
elements.cancel.addEventListener('click', () => elements.dialog.close());

elements.submit.addEventListener('click', (event) => {
    event.preventDefault();
    const { title, author, pages, isRead } = elements.form.elements;
    myLibrary.push(new Book(title.value, author.value, pages.value, isRead.checked));
    elements.form.reset();
    elements.dialog.close();
    displayBooks();
});

displayBooks();
