const { check } = require("express-validator");

module.exports = [
    check("firstName")
    .notEmpty()
    .withMessage("El nombre es obligatorio").bail()
    .isLength({min: 2}).withMessage("El campo debe contener al menos 2 caracteres")
    .isLength({max: 35}).withMessage("El campo puede contener un máximo de 35 caracteres"),

    check("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio").bail()
    .isLength({min: 2}).withMessage("El campo debe contener al menos 2 caracteres")
    .isLength({max: 35}).withMessage("El campo puede contener un máximo de 35 caracteres"),

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),
    
    check("phone")
    .optional({checkFalsy: true})
    .isLength({min:10, max:10}).withMessage("Ingrese los 10 números incluyendo el código de área").bail()
    .isNumeric().withMessage("Solo se pueden ingresar números"),

    check("adress")
    .optional({checkFalsy: true}),

    check("postalCode")
    .optional({checkFalsy: true}),



]