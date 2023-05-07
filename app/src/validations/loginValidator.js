const { check, body } = require("express-validator");
//const { users } = require("../database-old/");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),


    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('email')
    .custom((value, {req}) => {
        return User.findOne({
            where : { email : value}
        })
        .then(usuario => {
            if (!bcrypt.compareSync(req.body.password, usuario.password)){
                return Promise.reject('Credenciales Invalidas')
            }
        })
        .catch(errors => {
            console.log(errors);
            return Promise.reject("Email o contraseña incorrecto")
        })
    }),
]