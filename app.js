const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Set view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// About route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = { app };
