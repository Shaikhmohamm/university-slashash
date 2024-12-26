// routes/fav.js
const express = require('express');
const router = express.Router();
const pool = require('../db.js'); 

router.post('/add-favourite', (req, res) => {
  const { name, state_province, web_pages } = req.body;

  const query = 'INSERT INTO favourites (name, state_province, web_pages) VALUES (?, ?, ?)';
  pool.query(query, [name, state_province, web_pages], (err, result) => {
    if (err) {
      console.error('Error saving favourite:', err);
      return res.status(500).json({ error: 'Error saving favourite' });
    }

    return res.status(200).json({ message: 'Favourite saved successfully' });
  });
});

module.exports = router;
