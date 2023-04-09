const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const passport = require('passport');


const app = express();


// passport config
require('./config/passport')(passport);

// DB configuration
const db = require('./config/keys').MongoURI; 

// COnnect to mongo

mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('Connected to mongo database'))
.catch(err => console.log(err));
// EJS

app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set('view engine', 'ejs');



// BODY PARSER
app.use(express.urlencoded({ extended: false }));


// Express session middleware

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//  connect flash

app.use(flash());


// global variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// ROUTES

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});