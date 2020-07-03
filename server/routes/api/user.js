const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.get('/profile', async (req, res) => {
  console.log('profile');
  const id = req.query.id;
  console.log('userId for profile:::',id );
  try {
    const collections = await User.findById(id);
    res.json(collections);
    // const collections = await User.findById(id);
    //     console.log('collections',collections.email);
    //     const collections = await User.findById(id);
    // res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;