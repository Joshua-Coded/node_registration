const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

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


//  connect flash

app.use(flash());


// global variables

app.use((req, res, next) => {
    res.locals.success_msg = res.flash('success_msg');
    res.locals.error_msg = res.flash('error_msg');
    next();
})

// ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});