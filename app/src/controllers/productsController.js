const { validationResult } = require("express-validator");
const {
    Book,
    Language,
    Format,
    Genre,
    Editorial,
    Sequelize,
} = require("../database/models");
const { Op } = Sequelize;
const path = require("path");
const FS = require("fs");

const productsController = {
    list: function (req, res) {
        Book.findAll({
            include: [
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
                    association: "formats"
                },
                {
                    association: "languages"
                },
                {
                    association: "editorials"
                },
                {
                    association: "genres"
                },
            ]
        })
            .then((book) => {
                // return res.send(book);
                return res.render('products/product', {
                    book,
                    session: req.session,
                    doctitle: "Detalle del libro",
                    link: "/css/product.css"
                })
            })
            .catch(err => console.log(err))
    },

    addNewBook: function (req, res) {
        // busca todos los recursos en la db
        const LANGUAGES_PROMISE = Language.findAll();
        const FORMATS_PROMISE = Format.findAll();
        const GENRES_PROMISE = Genre.findAll();
        const EDITORIAL_PROMISE = Editorial.findAll();

        Promise.all([LANGUAGES_PROMISE, FORMATS_PROMISE, GENRES_PROMISE, EDITORIAL_PROMISE,])
            .then((results) => {
                const [
                    LANGUAGES,
                    FORMATS,
                    GENRES,
                    EDITORIALS,
                ] = results;
                // return res.send(EDITORIALS);
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
                description,
                cover: req.file?.filename ?? "book-default-cover.jpg",
            })
                .then((newBook) => {
                    return res.redirect(`/store/details/${newBook.id}`)
                })
                .catch((error) => console.log(error))
        } else {
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
        const BOOK_ID = req.params.id;
        const BOOK_PROMISE = Book.findByPk(BOOK_ID);
        const LANGUAGES_PROMISE = Language.findAll();
        const FORMATS_PROMISE = Format.findAll();
        const GENRES_PROMISE = Genre.findAll();
        const EDITORIAL_PROMISE = Editorial.findAll();

        Promise.all([BOOK_PROMISE, LANGUAGES_PROMISE, FORMATS_PROMISE, GENRES_PROMISE, EDITORIAL_PROMISE,])
            .then(([book, languages, formats, genres, editorials, cover]) => {
                // return res.send(cover)
                res.render("products/product-edit-form", {
                    book,
                    languages,
                    formats,
                    genres,
                    editorials,
                    cover,
                    session: req.session,
                    doctitle: "Editar libro",
                    link: "/css/product-create-form.css",
                });
            })
            .catch(error => console.log(error))
    },

    update: function (req, res) {
        const errors = validationResult(req)
        const BOOK_ID = req.params.id;

        if (errors.isEmpty()) {
            Book.findByPk(BOOK_ID)
            .then(bookToEdit => {
                if (req.file) {
					if (
						FS.existsSync(
							path.join(__dirname, "../../public/images/books/", bookToEdit.cover)
						) &&
						bookToEdit.cover != "book-default-cover.jpg"
					) {
						FS.unlinkSync(
							path.join(__dirname, "../../public/images/books/", bookToEdit.cover)
						);
					}
				}
				Book.update(
					{
						...req.body,
						cover: req.file?.filename ?? Book.cover,
					},
					{
						where: { id: BOOK_ID },
					}
				).then(() => {
					res.redirect(`/store/details/${BOOK_ID}`);
				});
            })
        } else {
            Book.findByPk(BOOK_ID)
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
            },
        })
            .then(() => {
                return res.redirect("/")
            })
            .catch(error => console.log(error))
    },

};

module.exports = productsController;