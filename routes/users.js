const express = require('express');

const router = express.Router();

// LOGIN PAGE
router.get('/login', (req, res) => {
    res.render("login");
})


// REGISTER PAGE
router.get('/register', (req, res) => {
    res.render("register");
})

module.exports = router;