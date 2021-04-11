const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');

//esta funcion me permite proteger las rutas segun si hay un usuario logueado o no
const { usuarioLogueado, usuarioNoLogueado } = require('../lib/auth');

// ruta para redirigir según si el registro es exitoso
router.post('/adminregistro', passport.authenticate('local.registro', {
  successRedirect: '/adminhome', //a donde te redirecciona si se registra correctamente
  failureRedirect: '/', //CAMBIAR UNA VEZ HECHO TODAS LAS RUTAS
  failureFlash: true
}));

router.post('/editarusuario/:id', async (req, res) => {
  const { id } = req.params;
  const {usuario,contrasena} = req.body; 
  const usuarioModificado = {
    usuario,
    contrasena
  };
  usuarioModificado.contrasena = await helpers.encryptPassword(contrasena);
  await pool.query('UPDATE t_usuarios set ? WHERE id_usuario = ?', [usuarioModificado, id]);
  req.flash('success','Información de usuario editada con exito');
  res.redirect('/admin');
});

// ruta para loguearse
router.get('/admin', usuarioNoLogueado, (req, res) => {
  res.render('auth/admin');
});

// ruta para redirigir segun si el inicio de sesion es exitoso
router.post('/admin', (req, res, next) => {
  passport.authenticate('local.admin', {
    successRedirect: '/adminhome', //a donde te redirecciona si se inicia correctamente
    failureRedirect: '/admin', //CAMBIAR UNA VEZ HECHO TODAS LAS RUTAS
    failureFlash: true
  })(req, res, next);
});

//ruta para cerrar sesion
router.get('/cerrarsesion', (req, res) => {
  req.logOut();
  req.flash('success','Usuario deslogueado correctamente');
  res.redirect('/admin');
});

// ruta al perfil del usuario
// router.get('/perfil', usuarioLogueado, (req, res) => {
//   res.render('partials/perfil');
// });

module.exports = router;