/**
 * main.js
 */
"use strict";

import { initAddNewBook, displayListOfBooks } from "./services/booksService.js";

// window.onload = (function () {
(function () {
    // declare variables for page-contents
    let HOME_PAGE_CONTENT;
    let CATALOG_PAGE_INITIAL_CONTENT;
    let ADD_NEW_BOOK_FORM_PAGE_CONTENT;

    const initializePageContents = function () {
        HOME_PAGE_CONTENT = `
            <h1>Welcome to City Books Rental Services<sup>&reg;</sup></h1>
            <hr>
            <img src="./images/banner1.png" alt="CityBooks Photo" style="width:100%;">
            <div class="my-3">
            <p>
                We are a top-flight, fully-digital Books Rental store. Find out more about us 
                and learn how we can serve you with a widest variety of books and lots of other
                digital content, for your education as well as your entertainment. You can also
                <a id="lnkCatalog1" href="#">browse our Catalog of Books</a> and be amazed at all that
                we have in stock for you, your family and friends. 
            </p>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis odit id 
                aliquid nisi saepe! Pariatur labore excepturi odio at temporibus incidunt repellat
                 eius? Suscipit sapiente, modi officiis quibusdam alias assumenda molestias eius 
                 delectus? Inventore alias soluta officia! Atque laborum tempora totam accusamus 
                 quos adipisci necessitatibus deserunt, expedita nemo! Sit cupiditate deleniti 
                 sapiente eius natus placeat eligendi labore quaerat optio vero maxime ipsum hic 
                 animi itaque dolores, magni possimus voluptatum, tenetur unde illo et consectetur.
            </p>
            <p>
                Already have access as a Member or System Admin? Then, simply Sign In to access
                the full range of services available to you, based on your role and access rights.
            </p>
        </div>            
        `;

        CATALOG_PAGE_INITIAL_CONTENT = `
            <div class="row my-3">
                <div class="col-md-6">
                    <span style="font-size: 1.7em;">Books in our Collection</span>
                </div>
                <div class="col-md-6">
                    <span style="float: right;">
                        <a id="btnAddNewBook" class="btn btn-outline-success btn-lg" href="#">Add New Book</a>
                    </span>
                </div>
            </div>
            <hr>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Overdue Fee</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Date Published</th>
                </tr>
                </thead>
                <tbody id="tbodyBooks">
                    <tr>
                        <td align="center" colspan="6">Loading... Please wait.</td>
                    </tr>
                </tbody>
            </table>
        `;

        ADD_NEW_BOOK_FORM_PAGE_CONTENT = `
            <div>
                <span style="font-size: 1.7em;">
                    New Book Form
                </span>
            </div>
            <div class="my-3">
                <span>
                    Note: Form fields marked with asterisk (*) are required.
                </span>
            </div>
            <form id="formNewBook">
                <fieldset>
                    <div class="row my-3">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="title">*Book Title:</label>
                                <input class="form-control" type="text" name="title" id="title" value="" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="isbn">*ISBN:</label>
                                <input class="form-control" type="text" name="isbn" id="isbn" value="" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="overdueFee">*Overdue Fee (per day):</label>
                                <input class="form-control" type="number" step=".01" min="0" name="overdueFee" id="overdueFee" value="0.00" required>
                            </div>
                        </div>
                    </div>
                    <div class="row my-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="publisher">*Publisher:</label>
                                <input class="form-control" type="text" name="publisher" id="publisher" value="" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="datePublished">*Date Published:</label>
                                <input class="form-control" type="date" name="datePublished" id="datePublished" value="" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <button id="btnSubmit" type="submit" class="btn btn-outline-success">Save Book</button>
                    </div>
                </fieldset>
            </form>            
        `;

    };

    initializePageContents();

    const displayHomePage = function () {
        document.getElementById("appContentRoot").innerHTML = HOME_PAGE_CONTENT;
        // Setup links
        document.getElementById("lnkCatalog1").addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Browse Catalog link clicked");
            // Now, navigate to the Catalog page content, n maintain history state
            displayCatalogPage();
            history.pushState({}, "catalog", "#catalog");
        });
    };

    const displayAddNewBookFormPage = function () {
        document.getElementById("appContentRoot").innerHTML = ADD_NEW_BOOK_FORM_PAGE_CONTENT;
        document.getElementById("title").focus();
        initAddNewBook();
    };

    const displayCatalogPage = function () {
        document.getElementById("appContentRoot").innerHTML = CATALOG_PAGE_INITIAL_CONTENT;
        // add event listener to the btnAddNewBook
        document.getElementById("btnAddNewBook").addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Add New Book button clicked");
            // Now, navigate to the AddNewBook form page content, n maintain history state
            displayAddNewBookFormPage();
            history.pushState({}, "addnewbook", "#addnewbook");
        });
        // fetch/present books data
        displayListOfBooks();
    };

    // Setup App Nav logic
    const appNav = {
        pages: ["home", "catalog", "addnewbook"],
        init: function () {
            document.querySelectorAll(".nav-link").forEach(navLink => {
                navLink.addEventListener("click", appNav.nav);
            });
            document.querySelectorAll(".navbar-brand").forEach(navBarBrand => {
            navBarBrand.addEventListener("click", appNav.nav);
            });
            // changed the logic here to find/refresh current page
            let pagename = location.hash.replace("#", "");
            if(pagename === "catalog") {
                history.replaceState({}, "Catalog", "#catalog");
            } else if (pagename === "addnewbook") {
                history.replaceState({}, "AddNewBook", "#addnewbook");
            } else {
                history.replaceState({}, "Home", "#home");
            }           
            window.addEventListener("popstate", appNav.popState);
            // displayHomePage(); 
            // changed the logic here to find/refresh current page
            // let pagename = location.hash.replace("#", "");
            console.log(`Page: ` + pagename);
            if(pagename === "home") {
                displayHomePage();
            } else if(pagename === "catalog") {
                displayCatalogPage();
            } else if(pagename === "addnewbook") {
                displayAddNewBookFormPage();
            } else {
                displayHomePage();
            }            
        },
        nav: function (event) {
            event.preventDefault();
            let currPage = event.target.getAttribute("data-target");
            history.pushState({}, currPage, `#${currPage}`);
            if(currPage === "home") {
                displayHomePage();
            } else if(currPage === "catalog") {
                displayCatalogPage();
            }
        },
        popState: function (event) {
            let pagename = location.hash.replace("#", "");
            if(pagename === "home") {
                displayHomePage();
            } else if(pagename === "catalog") {
                displayCatalogPage();
            } else if(pagename === "addnewbook") {
                displayAddNewBookFormPage();
            }
        }
    };

    // Load/Init the application
    document.addEventListener("DOMContentLoaded", appNav.init);
})();