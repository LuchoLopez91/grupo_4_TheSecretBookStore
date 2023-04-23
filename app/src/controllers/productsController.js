const { validationResult } = require("express-validator");
const { Book, Sequelize } = require("../database/models");
const { Op } = Sequelize;

const productsController = {
    list: (req,res) => {
        Book.findAll()
        .then(book => {
            res.render('all-products.ejs', {book})
        })
        .catch(err => console.log(err))
    },
    bookDetail: (req,res) => {
        Book.findByPk(req.params.id, { include: [
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
            }
        ] })
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
    addNewBook: function (req,res) {
        return res.render('product-create-formAdd')
    },
    store: function (req,res){
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const { title,
                    genre,
                    author,
                    price,
                    editorial,
                    languages,
                    format} = req.body;

                    Book.create({
                    title,
                    genre,
                    author,
                    price,
                    editorial,
                    languages,
                    format
            })
            .then((product) => {
                res.send(product)
            })
            .catch((error) => console.log(error))
        } else {
            return res.render('product-create-formAdd', {errors: errors.mapped()})
        }
    },
    edit: function (req,res) {
        const PRODUCT_ID = req.params.id;
        Book.findByPk(PRODUCT_ID)
        .then(Product => {
            return res.render('product-edit-form', {Product})
        })
        .catch(error => console.log(error));
    },
    update: function (req,res) {
        const errors = validationResult(req)
        const PRODUCT_ID = req.params.id;

        if (errors.isEmpty()){
            const { title,
                genre,
                author,
                price,
                editorial,
                languages,
                format} = req.body;

                Book.update({
                title,
                genre,
                author,
                price,
                editorial,
                languages,
                format
        }),{
            where: {
                id : PRODUCT_ID,
            }}
            .then((response) => {
                if (response){
                   return res.redirect("/all-product");
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
                    errors: errors.mapped})
            })
            .catch(error => console.log(error));
        }
    },
    erase: function (req,res) {
        const PRODUCT_ID = req.params.id;

        Book.findByPk(PRODUCT_ID)
        .then(productToDelete => 
            res.render(
                "productDelete",
                {Product: productToDelete}

            ))
            .catch(error => console.log(error));
    },
    burn: function (req,res) {
        const PRODUCT_ID = req.params.id;

        Book.destroy({
            where: {
                id: PRODUCT_ID
            }
        })
        .then(() =>{
            return res.redirect("/all-products")
        })
        .catch(error => console.log(error))
    }
};

module.exports = productsController;