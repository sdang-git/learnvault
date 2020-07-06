const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.get('/profile', async (req, res) => {
   const id = req.query.id;
  try {
    const collections = await User.findById(id);
    res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;