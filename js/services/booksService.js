/**
 * booksService.js
 */
 "use strict";

 import { addNewBook, getBooks } from "../datasource/booksDAO.js";
 
 export async function initAddNewBook() {
    const formNewBook = document.getElementById("formNewBook");
    console.log(formNewBook);
    const title = document.getElementById("title");
    const isbn = document.getElementById("isbn");
    const overdueFee = document.getElementById("overdueFee");
    const publisher = document.getElementById("publisher");
    const datePublished = document.getElementById("datePublished");
    formNewBook.addEventListener("submit", async function (event) {
        event.preventDefault();
        const strTitle = title.value;
        const strISBN = isbn.value;
        const strOverdueFee = overdueFee.value;
        const strPublisher = publisher.value;
        const strDatePublished = datePublished.value;
        const newBookObj = {
            "isbn": strISBN,
            "title": strTitle,
            "overdueFee": strOverdueFee,
            "publisher": strPublisher,
            "datePublished": strDatePublished
        };
        const newBookAdded  = await addNewBook(newBookObj);
        title.value = "";
        isbn.value = "";
        overdueFee.value = "0.00";
        publisher.value = "";
        datePublished.value = "";
        title.focus();
    });
    title.focus();
}

export async function displayListOfBooks() {
    let books = await getBooks();
    console.log(books);
    const tbodyBooks = document.getElementById("tbodyBooks");
    let trowsOfBook = "";
    books.forEach((book, i) => {
        trowsOfBook += `<tr>
            <th scope="row">${i+1}.</th>
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${new Intl.NumberFormat("en-US", {style:"currency", currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(book.overdueFee)}</td>
            <td>${book.publisher}</td>
            <td>${book.datePublished}</td>
        </tr>`;
    });
    tbodyBooks.innerHTML = trowsOfBook;
}
