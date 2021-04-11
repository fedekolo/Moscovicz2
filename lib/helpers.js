// --- DOCUMENTO QUE PERMITE PROCESAR LA INFORMACION SENSIBLE DE NUESTRA WEB, COMO POR EJEMPLO LAS CONTRASENAS ----

const bcrypt = require('bcryptjs');

const helpers = {};

// metodo para cifrar contrasenas
helpers.encryptPassword = async (contrasena) => {
  const salt = await bcrypt.genSalt(10); //se genera un patron para el cifrado
  const hash = await bcrypt.hash(contrasena, salt); //se cifra la contrasena
  return hash;
};

//compara la contrasena que ingresa el usuario con la contrasena encriptada que se guardo en la base de datos
helpers.matchPassword = async (contrasena, savedPassword) => {
  try {
    return await bcrypt.compare(contrasena, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

module.exports = helpers;