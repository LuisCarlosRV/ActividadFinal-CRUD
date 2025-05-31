// routes/contacts.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { name, phone, email } = req.body;
  db.run(`INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)`,
    [name, phone, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
});

// READ ALL
router.get('/', (req, res) => {
  db.all(`SELECT * FROM contacts`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ ONE
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(row);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  db.run(
    `UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?`,
    [name, phone, email, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
      res.json({ message: 'Contacto actualizado' });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM contacts WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json({ message: 'Contacto eliminado' });
  });
});

module.exports = router;
