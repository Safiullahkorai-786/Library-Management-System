const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all books
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    const [result] = await db.query(
      'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)',
      [title, author, genre, year]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update book
router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    const [result] = await db.query(
      'UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?',
      [title, author, genre, year, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM books WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;