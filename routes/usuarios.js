const express = require('express');
const app = express();
const {isLogin} = require('../middlewares/auth');

//ruta del formulario de registro
app.post('/adminregistro', passport.authenticate('local.registro',{
    successRedirect:'/adminhome',
    failureRedirect:'/adminregistro'
}));

//login
app.post('/admin',(req,res,next)=>{
passport.authenticate('local.iniciosesion',(err,user,info)=>{
    if(err){return next(err)}
    if(!user){return res.send(info)}
    req.login(user, function(err) {
        if (err) {return next(err);}
        return res.send('Te has logueado');
      });
})(req,res,next)
})

app.get('/cerrarsesion',isLogin,(req,res)=>{
req.logOut();
res.send('Cerraste sesion');
})

module.exports = usuariosRouter;