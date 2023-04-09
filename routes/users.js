const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// User model

const User = require('../models/User');

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
    res.render('register', { 
        errors,
         name, 
         email, 
         password,
          password2
        
        });
} else {
    
    // validation passed
    User.findOne({ email: email }).then(user => {
        if(user) {

            // USER EXISTs
            errors.push({ msg: 'Email already registered'});
            res.render('register', {
                 errors,
                  name,
                   email,
                    password,
                     password2
                    
                    });
        }  else {
                const newUser = new User({
                    name,
                    email,
                    password
                });


                // hashed password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
// set password to has
                        newUser.password = hash;


                        // save
                        newUser.save()
                        .then((user) => {
                            req.flash('success_msg', 'You are now registered successfully');
                            res.redirect('/users/login');
                        } )
                        .catch(err => console.log(err));
                } ))
        }
    });
}

})


// login handle

router.post('/users/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
})


// logout handle

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/login');
});


module.exports = router;