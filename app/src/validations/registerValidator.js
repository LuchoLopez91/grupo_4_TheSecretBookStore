const {body, check} = require("express-validator");
const path = require('path');
const fs = require("fs");
const usersPathDB = path.join(__dirname, "../database-old/users.json");
const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));
const { User } = require("../database/models");


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

	body('email')
        .custom(value => {
            return User.findOne({
                where : { email : value}
            })
            .then(user => {
                if(user){
                    return Promise.reject('el email ya esta registrado')
                }
            })
        }),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isStrongPassword( {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }).withMessage("La contraseña debe tener un mínimo de 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un caracter especial"),

    body('pass2')
    .custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check("avatar")
    .optional(),


   /* body("avatar")
    .custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".jpeg" , ".png", ".gif"];
        let fileExtension = path.extname(file.originalname);

        if(file && !acceptedExtensions.includes(fileExtension)){
                console.log("Las extensiones permitidas son .jpg, .jpeg, .png, .gif");
                return false;
            }
    }).withMessage("Las extensiones permitidas son .jpg, .jpeg, .png, .gif"),*/
]

