const express = require('express');
const router = express.Router();
const { usuarioLogueado,usuarioNoLogueado } = require('../lib/auth');

// conexion con base de datos
const pool = require('../database');

router.get('/', async (req, res) => {
    const cuadro = await pool.query('SELECT * FROM t_cuadros ORDER BY posicion DESC');
    res.render('layouts/home', { cuadro });
});

router.get('/admin',usuarioNoLogueado, (req, res) => {
    res.render('layouts/admin');
});

router.get('/adminhome',usuarioLogueado, async (req, res) => {
    const cuadro = await pool.query('SELECT * FROM t_cuadros ORDER BY posicion DESC');
    res.render('layouts/adminhome', { cuadro });
});

module.exports = router;