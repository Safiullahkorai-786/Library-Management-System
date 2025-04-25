const express = require('express');
const router = express.Router();
const db = require('../db');

// ➕ Add a new member (using promises)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    const [result] = await db.query(
      'INSERT INTO members (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Member added successfully ✅' 
    });
  } catch (error) {
    console.error('❌ MySQL Error:', error);
    res.status(500).json({ message: 'Error adding member' });
  }
});

// 📖 Get all members (using promises)
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM members');
    res.json(results);
  } catch (error) {
    console.error('MySQL Error:', error);
    res.status(500).send('Error fetching members');
  }
});

// 🔍 Get one member by ID (using promises)
router.get('/:id', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM members WHERE id = ?', 
      [req.params.id]
    );
    
    if (results.length === 0) {
      return res.status(404).send('Member not found');
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('MySQL Error:', error);
    res.status(500).send('Error fetching member');
  }
});

// ✏️ Update a member (using promises)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const [result] = await db.query(
      'UPDATE members SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, req.params.id]
    );
    
    res.json({ message: 'Member updated successfully ✏️' });
  } catch (error) {
    console.error('MySQL Error:', error);
    res.status(500).send('Error updating member');
  }
});

// 🗑️ Delete a member (using promises)
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Member deleted successfully 🗑️' });
  } catch (error) {
    console.error('MySQL Error:', error);
    res.status(500).send('Error deleting member');
  }
});

module.exports = router;