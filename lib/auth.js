// ---- PROCESO QUE PERMITE DAR ACCESO A CIERTAS PARTES DE LA PAGINA SEGUN SI ESTAS LOGUEADO O NO ----

module.exports = {
    usuarioLogueado (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    usuarioNoLogueado (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/adminhome');
    },
};