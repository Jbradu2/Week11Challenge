const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Define an array to store notes 
let notes = [];

// API Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});
 // Handle creation of a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  //generate unique ID 
  newNote.id = notes.length + 1;

  notes.push(newNote);
  fs.writeFileSync('./db.json', JSON.stringify(notes), 'utf8');
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);

  notes = notes.filter((note) => note.id !== noteId);
  fs.writeFileSync('./db.json', JSON.stringify(notes), 'utf8');
  res.json({ message: 'Note deleted' });
});

// HTML Routes
//This route serves the index (landing page) 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//This route serves the notes page 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
//this route will redirect any unspecified routes back to "landing page"
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Load initial data from db.json if available and populate to notes
if (fs.existsSync('./db.json')) {
  notes = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
}
//listen on defined port (3001)
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});