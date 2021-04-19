const express = require('express');
const router = express.Router();

// conexion con base de datos
const pool = require('../database');

router.get('/', async (req, res) => {
    const cuadro = await pool.query('SELECT * FROM t_cuadros');
    res.render('layouts/home', { cuadro });
});

router.get('/admin', (req, res) => {
    res.render('layouts/admin');
});

router.get('/adminhome', (req, res) => {
    res.render('partials/adminhome');
});

module.exports = router;