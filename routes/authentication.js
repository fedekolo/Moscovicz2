const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');

//esta funcion me permite proteger las rutas segun si hay un usuario logueado o no
const { usuarioLogueado, usuarioNoLogueado } = require('../lib/auth');

// ruta para loguearse
// router.get('/login', usuarioNoLogueado, (req, res) => {
//   res.render('auth/admin');
// });

// ruta para redirigir segun si el inicio de sesion es exitoso
router.post('/login', (req, res, next) => {
  passport.authenticate('local.login', {
    successRedirect: '/', //a donde te redirecciona si se inicia correctamente
    failureRedirect: '/admin',
    failureFlash: true
  })(req, res, next);
});

router.post('/registro', passport.authenticate('local.registro', {
  successRedirect: '/', //a donde te redirecciona si se registra correctamente
  failureRedirect: '/admin', //CAMBIAR UNA VEZ HECHO TODAS LAS RUTAS
  failureFlash: true,
  session: false
}));

//ruta para cerrar sesion
router.get('/cerrarsesion', (req, res) => {
  req.logOut();
  req.flash('success','Usuario deslogueado correctamente');
  res.redirect('/admin');
});

module.exports = router;