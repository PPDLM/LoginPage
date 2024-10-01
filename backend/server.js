const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
