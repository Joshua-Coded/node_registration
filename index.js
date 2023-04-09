const express = require('express');

const app = express();

// ROUTES
app.use('/', require('./routes/index'))

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});