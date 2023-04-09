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


// Register handle

router.post("/register", (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];


    /// checkrequired field

    if(!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill all required fields"});
    }

        // check for password matches

        if(password !== password) {
                errors.push({ msg: "password do not match"});
        }

// check for pass lenght

if(password.length < 6){
    errors.push({ msg: "password should be 6 characters"});
}

if(errors.length > 0){
    res.render('register', { errors, name, email, password, password2})
} else {
    res.send("pass")
}

})
module.exports = router;