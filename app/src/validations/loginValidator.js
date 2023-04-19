const { check, body } = require("express-validator");
const { users } = require("../database-old/");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom(value => {
        let user = users.find(user => user.email === value)

        return User.findOne({
            where: {
                email: value,
            },
        })
        .then(
            user !== undefined
        )
        .catch(err => console.log(err))

    })
    .withMessage("Email no registrado"),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("password")
    .custom((value, { req }) => {
        return User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then((user) => {
            if(!bcrypt.compareSync(value, user.dataValues.password)) {
                return Promise.reject();
            }
        })
        .catch(() => Promise.reject("Credenciales inválidas"));
    }),
]