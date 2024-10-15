const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const newusername = req.body.username;
    const newpassword = req.body.password;

    if (newusername && newpassword) {
        if (users.filter((user) => (user.username === newusername)).length == 0) {
            users.push({"username": newusername, "password": newpassword});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

    res.send(JSON.stringify(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let book_info = books[isbn];
  res.send(JSON.stringify(book_info));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  2
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let books_by_author = {};
  let author = req.params.author;
  let keys = Object.keys(books);
  for (i=0; i<keys.length; i++) {
    if (books[keys[i]].author == author) {
        books_by_author[keys[i]] = books[keys[i]];
    }
  }
  res.send(JSON.stringify(books_by_author));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let books_with_title = {};
  let title = req.params.title;
  let keys = Object.keys(books);
  for (i=0; i<keys.length; i++) {
    if (books[keys[i]].title == title) {
        books_with_title[keys[i]] = books[keys[i]];
    }
  }
  res.send(JSON.stringify(books_with_title));
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let book = req.params.isbn;
  res.send(JSON.stringify(books[book].reviews));
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
