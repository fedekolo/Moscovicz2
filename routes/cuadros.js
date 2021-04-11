const express = require('express');
const router = express.Router();
const multer = require('multer');

router.post('/upload',(req,res) => {
    console.log(req.file);
    res.send('Subido');
});

const storage = multer.diskStorage({
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

module.exports = router;
module.exports = storage;