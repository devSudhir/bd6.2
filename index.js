const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

let authors = [
  {
    authorId: 1,
    book: '1984',
    name: 'Gorge',
  },
  {
    authorId: 2,
    book: 'The great gatsby',
    name: 'F. Scott Fitzgerald',
  },
  {
    authorId: 3,
    book: 'Pride and Prejustice',
    name: 'Jane Austen',
  },
  {
    authorId: 4,
    book: 'To Kill a Mockingbird',
    name: 'Harper Lee',
  },
];

function getAuthors() {
  return authors;
}

function getAuthorById(authorId) {
  return authors.find((author) => author.authorId === authorId);
}

function addNewAuthor(author) {
  const newAuthor = {
    authorId: authors.length + 1,
    ...author,
  };
  authors.push(newAuthor);
  return newAuthor;
}

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/authors', (req, res) => {
  res.status(200).json(getAuthors());
});

app.get('/author/details/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  res.status(200).json({ author: getAuthorById(authorId) });
});

app.get('/author/new', (req, res) => {
  const author = req.body;
  const newAuthor = addNewAuthor(author);
  res.status(201).json({ author: newAuthor });
});

module.exports = { app, getAuthors, getAuthorById, addNewAuthor };
