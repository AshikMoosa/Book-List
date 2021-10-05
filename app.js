//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  //add data to table body
  const list = document.getElementById("book-list");

  //create table rows
  const row = document.createElement("tr");

  //append rows to td html
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

//Show alert
UI.prototype.showAlert = function (msg, className) {
  //create alert div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  //get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  //timeout
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  //Get values from form fields
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Show success msg after adding

    ui.showAlert("Book added!", "success");
    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event delete book
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});
