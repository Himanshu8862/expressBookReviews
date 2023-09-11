const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Please provide both username and password" });
});

// Get the book list available in the shop

public_users.get('/', function (req, res) {
    let getBooks = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., fetching data from a database)
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });

    getBooks
        .then((bookList) => {
            return res.status(200).json(bookList);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const index = Object.keys(books);
    const booksFound = [];
    index.forEach(idx => {
        if (books[idx].isbn === isbn) {
            booksFound.push(books[idx]);
        }
    })
    let getBooks = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., fetching data from a database)
        setTimeout(() => {
            resolve(booksFound);
        }, 1000);
    });

    getBooks
        .then((bookList) => {
            return res.status(200).json(bookList);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const index = Object.keys(books);
    const booksFound = [];
    index.forEach(idx => {
        if (books[idx].author === author) {
            booksFound.push(books[idx]);
        }
    })

    let getBooks = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., fetching data from a database)
        setTimeout(() => {
            resolve(booksFound);
        }, 1000);
    });
    
    getBooks
        .then((bookList) => {
            return res.status(200).json(bookList);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const index = Object.keys(books);
    const booksFound = [];
    index.forEach(idx => {
        if (books[idx].title === title) {
            booksFound.push(books[idx]);
        }
    })
    
    let getBooks = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., fetching data from a database)
        setTimeout(() => {
            resolve(booksFound);
        }, 1000);
    });
    
    getBooks
        .then((bookList) => {
            return res.status(200).json(bookList);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const index = Object.keys(books);
    const booksFound = [];
    index.forEach(idx => {
        if (books[idx].isbn === isbn) {
            booksFound.push(books[idx].reviews);
        }
    })
    return res.status(200).json(booksFound);
});

module.exports.general = public_users;
