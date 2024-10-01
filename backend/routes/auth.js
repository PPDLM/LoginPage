const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuario registrado');
});

// Inicio de sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login'
}));

module.exports = router;
