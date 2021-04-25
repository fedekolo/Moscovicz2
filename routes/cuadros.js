const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// SETTINGS
const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/images/cuadros'), // permite guardar imagenes en la ruta que elija
    filename: (req,file,cb) => {
        cb(null, uuidv4() + path.extname(file.originalname)); // las imagenes que subo van a cambiar su nombre a un algoritmo
    }
});
const pool = require('../database'); // conexion con base de datos

// MIDDLEWARE
const upload = multer({
    storage,
    dest: path.join(__dirname,'../public/images/cuadros'), // permite guardar imagenes en la ruta que elija
    limits: {fileSize: 200000}, // limita a 200kb el tamaño de las imagenes a subir
    
    //validacion del tipo de archivo
    fileFilter: (req,file,cb) => {
        let filetypes = /jpeg|jpg|png|gif/; // extensiones validas para subir
        let mimetype = filetypes.test(file.mimetype); // comprueba con el archivo que sea una extension valida
        if (mimetype) {
            return cb(null,true);
        };
        cb("Error en la extension del archivo") //mensaje de error
    }
}).single('image'); 

// RUTAS

// subir cuadro
router.post('/upload',upload, async (req,res) => {
    const { nombre, descripcion} = req.body;
    const archivo_imagen = req.file.filename;
    const cuadroNuevo = {
        nombre,
        archivo_imagen,
        descripcion
    };
    await pool.query('INSERT INTO t_cuadros set ?', [cuadroNuevo]);
    req.flash('success','Cuadro subido correctamente');
    res.redirect('/adminhome'); // una vez subido el producto te redirecciona a esta ruta
});

// editar cuadro
router.post('/editarcuadro/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body; 
    const cuadroNuevo = {
        nombre,
        descripcion
    };
    await pool.query('UPDATE t_cuadros set ? WHERE id = ?', [cuadroNuevo, id]);
    req.flash('success','Cuadro editado con éxito');
    res.redirect('/adminhome');
});

// eliminar cuadro
router.post('/eliminarcuadro/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM t_cuadros WHERE ID = ?', [id]);
    req.flash('success','Cuadro eliminado con éxito');
    res.redirect('/adminhome'); 
});

// subir posicion
router.post('/subirposicion/:id', async (req,res) => {
    // subo una posicion al cuadro seleccionado
    const { id } = req.params;
    const cuadroAsubir = await pool.query('SELECT * FROM t_cuadros WHERE ID = ?', [id]);
    const posicionMayor = await pool.query('SELECT MAX(posicion) mayor FROM t_cuadros'); // tomo cual es la mayor posicion entre todos los cuadros

    if (cuadroAsubir[0].posicion === posicionMayor[0].mayor) {
        req.flash('message','El cuadro ya está en la primer posición');
        res.redirect('/adminhome');
    } else {
        cuadroAsubir[0].posicion++
        await pool.query('UPDATE t_cuadros set ? WHERE id = ?', [cuadroAsubir[0], id]);
    }

    // bajo la posicion al cuadro que estaba por debajo del que subi
    const cuadroAbajar = await pool.query('SELECT * FROM t_cuadros WHERE posicion = ?', [cuadroAsubir[0].posicion]);
    cuadroAbajar[0].posicion--
    await pool.query('UPDATE t_cuadros set ? WHERE id = ?', [cuadroAbajar[0], cuadroAbajar[0].id]);

    res.redirect('/adminhome'); 
})

module.exports = router;
