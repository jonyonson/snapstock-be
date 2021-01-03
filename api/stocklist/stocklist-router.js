const express = require('express');
const fetch = require('node-fetch');
const restricted = require('../../middleware/restricted');
const router = express.Router();
const { IEX_API_KEY, BASE_URL } = require('../../constants');

router.get('/:symbols', restricted(), async (req, res) => {
  try {
    const symbols = req.params.symbols.split(',');
    const url = `${BASE_URL}/market/batch?symbols=${symbols}&types=quote&token=${IEX_API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving data from IEX Cloud' });
  }
});

module.exports = router;
