const {body, check} = require("express-validator");
const path = require('path');
const fs = require("fs");
const usersPathDB = path.join(__dirname, "../database-old/users.json");
const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));
const { User } = require("../database/models");


module.exports = [
    check("firstName")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom((value) => {
        return User.findOne({
            where: {
                email: value,
            },
        })
        .then(user => {
            if(user) return Promise.reject("Ya existe un usuario asociado e este email")
        })
        .catch(err => console.log(err));
    })
    .withMessage("Email ya registrado"),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 6,
    })
    .withMessage('La contraseña debe tener como mínimo 6 caracteres'),

    body('pass2')
    .custom((value, {req}) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

]