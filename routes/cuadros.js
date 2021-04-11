const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// SETTINGS
const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/images/cuadros'), // permite guardar imagenes en la ruta que elija
    filename: (req,file,cb) => {
        cb(null,file.originalname) // las imagenes que subo van a conservar su nombre original
    }
});

// MIDDLEWARE
const upload = multer({
    storage,
    dest: path.join(__dirname,'../public/images/cuadros'), // permite guardar imagenes en la ruta que elija
    limits: {fileSize: 200000}
}).single('image'); 

// RUTAS
router.post('/upload',upload,(req,res) => {
    console.log(req.file);
    res.send('Subido');
});

module.exports = router;
