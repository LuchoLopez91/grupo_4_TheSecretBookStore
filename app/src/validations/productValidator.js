const {check} = require('express-validator');

module.exports = [
    check('title').notEmpty().withMessage('Titulo Obligatorio'),
    check('author').notEmpty().withMessage('Autor Obligatorio'),
    check('isbn13').notEmpty().withMessage('ISBN13 Obligatorio').bail()
        .isNumeric().withMessage('Datos Inválidos'),
    check('price').notEmpty().withMessage('Precio Obligatorio').bail()
        .isNumeric().withMessage('El precio debe ser expresado en números'),
    check('pageCount').isNumeric().withMessage('La cantidad de páginas debe ser expresada en números'),
    check('editorial_id').notEmpty().withMessage('Editorial Obligatoria'),
    check('language_id').notEmpty().withMessage('Idioma Obligatorio'),
    check('format_id').notEmpty().withMessage('Formato Obligatorio'),
    check('genre_id').notEmpty().withMessage('Género Obligatorio'),

]