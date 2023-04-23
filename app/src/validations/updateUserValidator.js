const { check } = require("express-validator");

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
]