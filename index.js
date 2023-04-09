const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const path = require('path');
const mongoose = require('mongoose');

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




// ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});