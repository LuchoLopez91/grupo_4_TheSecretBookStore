const { validationResult } = require("express-validator");
const {
    Book,
    Language,
    Format,
    Genre,
    Editorial,
    Cover,
    Sequelize,
} = require("../database/models");
const { Op } = Sequelize;

const productsController = {
    list: function (req, res) {
        Book.findAll({
            include: [
                {
                    association: "covers"
                },
                {
                    association: "formats"
                },
                {
                    association: "languages"
                },
                {
                    association: "editorials"
                },
                {
                    association: "authors"
                },
            ]
        })
            .then(book => {
                res.render('products/all-products', {
                    book,
                    session: req.session,
                    doctitle: "Nuestra colección completa",
                    link: "/css/home.css"
                })
            })
            .catch(err => console.log(err))
    },
    bookDetail: function (req, res) {
        Book.findByPk(req.params.id, {
            include: [
                {
                    association: "covers"
                },
                {
                    association: "formats"
                },
                {
                    association: "languages"
                },
                {
                    association: "editorials"
                },
            ]
        })
            .then((book) => {
                res.render('products/product', {
                    book,
                    session: req.session,
                    doctitle: "Detalle del libro",
                    link: "/css/product.css"
                })
            })
            .catch(err => console.log(err))
    },
    /*  ASI ESTABA, LO DEJO COMENTADO */
    /*bookDetail: (req,res) => {
        Book.findByPk(req.params.id)
        .then(book => {
            res.render('books-by-genres.ejs', {book})
        })
        .catch(err => console.log(err))
    },*/
    addNewBook: function (req, res) {
        // busca todos los recursos en la db
        const LANGUAGES_PROMISE = Language.findAll();
        const FORMATS_PROMISE = Format.findAll();
        const GENRES_PROMISE = Genre.findAll();
        const EDITORIAL_PROMISE = Editorial.findAll();

        Promise.all([LANGUAGES_PROMISE, FORMATS_PROMISE, GENRES_PROMISE,EDITORIAL_PROMISE,])
            .then((results) => {
                // return res.send(results[0]);
                const LANGUAGES = results[0];
                const FORMATS = results[1];
                const GENRES = results[2];
                const EDITORIALS = results [3];
                // return res.send(FORMATS);
                return res.render('products/product-create-form', {
                    session: req.session,
                    doctitle: "Crear libro",
                    link: "/css/product-create-form.css",
                    LANGUAGES,
                    FORMATS,
                    GENRES,
                    EDITORIALS,
                })
            })
            .catch(err => console.log(err))

        /*para terminar */
    },
    store: function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { title,
                genre_id,
                author,
                isbn13,
                pageCount,
                price,
                editorial_id,
                language_id,
                format_id,
                description,
             } = req.body;

            Book.create({
                title,
                genre_id,
                author,
                pageCount,
                isbn13,
                price,
                editorial_id,
                language_id,
                format_id,
                description
            })
            .then((book) => {
                if (!req.file || req.file.length === 0) {
                  Cover.create({
                    route: "book-default-cover.jpg",
                    book_id: book.id,
                  }).then(() => {
                    return res.redirect("/");
                  });
                } else {
                  Cover.create({
                    route: req.file.filename,
                    book_id: book.id
                  })
                    .then(() => {
                      return res.redirect("/");
                    });
                }
              })
              .catch((error) => console.log(error))
          }  else {
            return res.render('product-create-form', {        
                session: req.session,
                doctitle: "Crear libro",
                link: "/css/product-create-form.css",
                LANGUAGES,
                FORMATS,
                GENRES,
                EDITORIALS,
                errors: errors.mapped() 
            })
        }
    },
    edit: function (req, res) {
        const productId = req.params.id;
        const PRODUCT_PROMISE = Book.findByPk(productId);
        const LANGUAGES_PROMISE = Language.findAll();
        const FORMATS_PROMISE = Format.findAll();
        const GENRES_PROMISE = Genre.findAll();
        const EDITORIAL_PROMISE = Editorial.findAll();
    
        Promise.all([PRODUCT_PROMISE, LANGUAGES_PROMISE, FORMATS_PROMISE, GENRES_PROMISE, EDITORIAL_PROMISE])
        .then(([book, languages, formats, genres, editorials]) => {
          res.render("products/product-edit-form", {
            book, languages, formats, genres, editorials,
            session: req.session,
            doctitle: "Editar libro",
            link: "/css/product-create-form.css",
          });
        })
        .catch(error => console.log(error))
      }, 

    update: function (req, res) {
        const errors = validationResult(req)
        const PRODUCT_ID = req.params.id;

        if (errors.isEmpty()) {
            const { 
                title,
                genre_id,
                author,
                pageCount,
                isbn13,
                price,
                editorial_id,
                language_id,
                format_id,
                description

            } = req.body;

            Book.update({
                title,
                genre_id,
                author,
                pageCount,
                isbn13,
                price,
                editorial_id,
                language_id,
                format_id,
                description
                }), {
                where: {
                    id: PRODUCT_ID,
                }
            }
                .then((response) => {
                    if (response) {
                        return res.redirect("/");
                    } else {
                        throw new Error(
                            "No se pudo editar el producto"
                        )
                        //proximamente..
                    }
                })
                .catch(error => console.log(error))
        } else {
            Book.findByPk(PRODUCT_ID)
                .then(book => {
                    return res.render('product-edit-form', {
                        book,
                        errors: errors.mapped
                    })
                })
                .catch(error => console.log(error));
        }
    },
    erase: function (req, res) {
        const PRODUCT_ID = req.params.id;

        Book.findByPk(PRODUCT_ID)
            .then(productToDelete =>
                res.render(
                    "productDelete",
                    { Product: productToDelete }

                ))
            .catch(error => console.log(error));
    },
    burn: function (req, res) {
        const PRODUCT_ID = req.params.id;

        Book.destroy({
            where: {
                id: PRODUCT_ID
            }
        })
            .then(() => {
                return res.redirect("/all-products")
            })
            .catch(error => console.log(error))
    }
};

module.exports = productsController;