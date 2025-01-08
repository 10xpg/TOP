class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
  }

  toggleStatus() {
    if (this.status === "read") {
      this.status = "not read";
    } else {
      this.status = "read";
    }
  }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, status) {
  let book = new Book(title, author, pages, status);
  myLibrary.push(book);
  updateTable();
  return `Added ${book.title} to myLibrary`;
}

const tableHead = document.querySelector(".head");
const tableBody = document.querySelector(".repo");

function updateTable() {
  tableBody.innerHTML = "";
  const headers = Object.keys(myLibrary[0]);
  if (tableHead.children.length === 0) {
    headers.forEach((header) => {
      const head = document.createElement("th");
      head.textContent = header.toUpperCase();
      tableHead.appendChild(head);
    });

    const removeHeader = document.createElement("th");
    removeHeader.textContent = "REMOVE";
    tableHead.appendChild(removeHeader);
  }

  myLibrary.forEach((book, bookIndex) => {
    const row = document.createElement("tr");
    headers.forEach((header) => {
      const cell = document.createElement("td");
      // Special handling for status column
      if (header === "status") {
        const statusButton = document.createElement("button");
        statusButton.textContent = book[header];
        statusButton.classList.add("status-button");
        // Add appropriate class based on current status
        statusButton.classList.add(
          book[header] === "read" ? "status-read" : "status-not-read"
        );

        statusButton.addEventListener("click", () => {
          book.toggleStatus();
          statusButton.textContent = book.status;
          // Update button appearance
          statusButton.classList.toggle("status-read");
          statusButton.classList.toggle("status-not-read");
        });
        cell.appendChild(statusButton);
      } else {
        cell.textContent = book[header];
      }

      row.appendChild(cell);
    });

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "delete";
    removeButton.setAttribute("data-index", bookIndex);
    removeButton.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeBookFromLibrary(index);
    });
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    tableBody.appendChild(row);
  });
}

const dialog = document.querySelector(".dialog");
const newBookButton = document.querySelector(".button");
const closeModalButton = document.querySelector(".x");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

closeModalButton.addEventListener("click", () => {
  dialog.close();
});

const newBookForm = document.querySelector(".add-book");
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = newBookForm.elements["title"].value;
  const author = newBookForm.elements["author"].value;
  const pages = newBookForm.elements["pages"].value;
  const status = newBookForm.elements["status"].value;

  addBookToLibrary(title, author, pages, status);
});

function removeBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  updateTable();
}
