const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

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