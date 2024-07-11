require("dotenv").config();
require("./config/db")();
require("./lib/system/config");
require('./middleware/passport-setup');
const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const loadRouters = require("./routers");
const apikey = require("./middleware/authApiKey");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use the secret from .env
  resave: false,
  saveUninitialized: false
}));

// Middleware untuk Passport
app.use(passport.initialize());
app.use(passport.session());

loadRouters(app);

app.get("/authorization", apikey, (req, res) => {
  res.json({
    authorization: true
  });
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rute untuk Google OAuth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

// server.js
app.get('/api/get-api-key', (req, res) => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.json({ apiKey: req.user.apiKey, apiKeyLimit: req.user.apiKeyLimit });
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('profile', { user: req.user });
  } else {
    res.redirect('/auth/google');
  }
});


// Rute untuk logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Sepertinya ada kesalahan!");
}); 