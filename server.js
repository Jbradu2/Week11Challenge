const express = require('express');

const PORT = 3001;

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(express.static('public'));

// Define an array to store notes
let notes = [];

// API Routes
app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // Handle creation of a new note
});

app.delete('/api/notes/:id', (req, res) => {
  // Handle deletion of a note
});