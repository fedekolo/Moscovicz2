const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/mailcontacto', async (req,res) => {
    const { nombre, apellido, mail, telefono, comentarios} = req.body;

    // contenido del mail a enviar
    contentHTML = `
        <div style="font-family: 'Cutive Mono', monospace;">
            <h1>Contacto desde web</h1>
            <h3>Información de contacto:</h3>
            <ul>
                <li><strong>Nombre:</strong> ${nombre}</li>
                <li><strong>Apellido:</strong> ${apellido}</li>
                <li><strong>Mail:</strong> ${mail}</li>
                <li><strong>Teléfono:</strong> ${telefono}</li>
                <li><strong>Comentarios:</strong> ${comentarios}</li>
            </ul>
        </div>
    `;

    // datos del host de mail desde donde voy a enviar los correos
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 25,
        secure: false,
        auth: {
            user: 'a1fd0831a40fb7',
            pass: 'b75a1c80cbac69'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // configuracion de que voy a enviar al correo
    let info = await transporter.sendMail({
        from: '"Moscovicz Web" <e87ba272e4-4e32d8@inbox.mailtrap.io>', // sender address,
        to: 'fedekoloo@gmail.com',
        subject: 'Contacto desde Moscovicz Web',
        html: contentHTML
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    req.flash('success','Contacto enviado con éxito');
    res.redirect('/');
})

module.exports = router;