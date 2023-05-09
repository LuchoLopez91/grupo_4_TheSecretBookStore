const {check} = require('express-validator');

module.exports = [
    check('title').notEmpty().withMessage('Titulo Obligatorio').bail().isLength({min: 2}).withMessage("El título debe tener al menos 2 caracteres"),
    check('author').notEmpty().withMessage('Autor Obligatorio'),
    check('isbn13').notEmpty().withMessage('ISBN13 Obligatorio').bail()
        .isNumeric().withMessage('Datos Inválidos'),
    check('price').notEmpty().withMessage('Precio Obligatorio').bail()
        .isNumeric().withMessage('El precio debe ser expresado en números'),
    check('pageCount').optional({checkFalsy: true})
        .isNumeric().withMessage('La cantidad de páginas debe ser expresada en números'),
    check('editorial_id').notEmpty().withMessage('Editorial Obligatoria'),
    check('language_id').notEmpty().withMessage('Idioma Obligatorio'),
    check('format_id').notEmpty().withMessage('Formato Obligatorio'),
    check('genre_id').notEmpty().withMessage('Género Obligatorio'),
    check("description").optional({checkFalsy: true})
        .isLength({min: 20}).withMessage("La descripción debe tener al menos 20 caracteres"),
]