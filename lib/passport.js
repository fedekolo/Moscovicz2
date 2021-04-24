const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

//consulta a la base de datos para inicio de sesion y mensajes de aleta
passport.use('local.login', new LocalStrategy({
  usernameField: 'usuario', //desde que campo tomo el nombre de usuario
  passwordField: 'contrasena', //desde que campo tomo la contrasena
  passReqToCallback: true
}, async (req, usuario, contrasena, done) => {
  const rows = await pool.query('SELECT * FROM t_usuarios WHERE usuario = ?', [usuario]);
  //validaciones de usuario y contrasena
  
  if (rows.length > 0) {
    const usuario = rows[0];
    const contrasenaValida = await helpers.matchPassword(contrasena, usuario.contrasena);
    if (contrasenaValida) {
      done(null, usuario, req.flash('success', 'Bienvenido Franco'));
    } 
    else {
      done(null, false, req.flash('message', 'Usuario y/o contraseña incorrectos'));
    }
  } else {
    return done(null, false, req.flash('message', 'Usuario y/o contraseña incorrectos'));
  }
}));

// ingreso de datos de registro del usuario en la base de datos
// passport.use('local.registro', new LocalStrategy({
//   usernameField: 'usuario',
//   passwordField: 'contrasena',
//   passReqToCallback: true
// }, async (req, usuario, contrasena, done) => {
//     let usuarioNuevo = {
//       usuario, 
//       contrasena
//     };

//     usuarioNuevo.contrasena = await helpers.encryptPassword(contrasena);
      
//       // guardo el nuevo usuario en la base de datos
//       const resultado = await pool.query('INSERT INTO t_usuarios SET ? ', usuarioNuevo);
//       usuarioNuevo.id_usuario = resultado.insertId;
//       return done(null, usuarioNuevo);
//     }));

// serializacion del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// desserializacion del usuario
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM t_usuarios WHERE id = ?', [id]);
  done(null, rows[0]);
});