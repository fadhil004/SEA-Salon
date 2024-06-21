const express = require('express');
const session = require('express-session');
const routes = require('./routers');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'kunci-inggris', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = { app };
