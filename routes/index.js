const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('partials/home');
});

router.get('/admin', (req, res) => {
    res.render('partials/admin');
});

router.get('/adminhome', (req, res) => {
    res.render('partials/adminhome');
});

module.exports = router;