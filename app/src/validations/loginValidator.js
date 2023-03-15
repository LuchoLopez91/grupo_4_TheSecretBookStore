const { check,  body } = require ('express-validator');
const { users } = require ("../database");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El mail es obligatorio").bail()
    .isEmail()
    .withMessage("Email valido"),

    body("email")
    .custom( value => {
        let user = users.find( user => user.email === value);

        return user !== undefined;
    })
    .withMessage("Email no registrado"),

    check("pass")
    .notEmpty()
    .withMessage("Debes escribir tu contraseña"),

    body("pass")
    .custom((value, {req}) => {
        let user = users.find( user => user.email === req.body.email);

        return user.pass === value;
    })
    .withMessage("Contraseña invalida")
   
]