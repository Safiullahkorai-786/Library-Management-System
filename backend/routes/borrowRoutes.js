const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all borrow records with book and member details
router.get('/', async (req, res) => {
  try {
    const [borrows] = await db.query(`
      SELECT 
        borrows.*,
        books.title AS book_title,
        books.author AS book_author,
        members.name AS member_name,
        members.email AS member_email
      FROM borrows
      LEFT JOIN books ON borrows.book_id = books.id
      LEFT JOIN members ON borrows.member_id = members.id
      ORDER BY borrows.borrow_date DESC
    `);
    
    res.json(borrows);
  } catch (error) {
    console.error('Error fetching borrow records:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create new borrow record
router.post('/', async (req, res) => {
  try {
    const { book_id, member_id, borrow_date } = req.body;
    
    // Basic validation
    if (!book_id || !member_id) {
      return res.status(400).json({ error: 'Book ID and Member ID are required' });
    }

    const [result] = await db.query(
      'INSERT INTO borrows (book_id, member_id, borrow_date) VALUES (?, ?, ?)',
      [book_id, member_id, borrow_date || new Date().toISOString().slice(0, 10)]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Borrow record created successfully'
    });
  } catch (error) {
    console.error('Error creating borrow record:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update borrow record (mark as returned)
router.put('/:id', async (req, res) => {
  try {
    const return_date = req.body.return_date || new Date().toISOString().slice(0, 10);
    
    const [result] = await db.query(
      'UPDATE borrows SET return_date = ? WHERE id = ?',
      [return_date, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Borrow record not found' });
    }

    res.json({ message: 'Borrow record updated successfully' });
  } catch (error) {
    console.error('Error updating borrow record:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE borrow record
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM borrows WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Borrow record not found' });
    }

    res.json({ message: 'Borrow record deleted successfully' });
  } catch (error) {
    console.error('Error deleting borrow record:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;