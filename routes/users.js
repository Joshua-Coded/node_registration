const express = require('express');

const router = express.Router();

// LOGIN PAGE
router.get('/login', (req, res) => {
    res.send("LOGIN!");
})


// REGISTER PAGE
router.get('/register', (req, res) => {
    res.send("REGISTERED!");
})

module.exports = router;