const { validationResult } = require("express-validator");
const { Products, Sequelize } = require("../database/models");
const { Op } = Sequelize;

const productsController = {
    'list': (req,res) => {
        Product.findAll()
        .then(products => {
            res.render('all-products.ejs', {Products})
        })
    },
    'ByGenres': (req,res) => {
        Product.findByPk(req.params.id)
        .then(product => {
            res.render('books-by-genres.ejs', {product})
        })
    },
 
    add: function (req,res) {
        return res.render('product-create-formAdd')
    },
    create: function (req,res){
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const { title,
                    genre,
                    author,
                    price,
                    editorial,
                    languages,
                    format} = req.body;

            Product.create({
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
            return res.render('product-create-formAdd', {erorrs: errors.mapped()})
        }
    },
    edit: function (req,res) {
        const PRODUCT_ID = req.params.id;
        Product.findByPk(PRODUCT_ID)
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

            Product.update({
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
            Product.findByPk(PRODUCT_ID)
            .then(Product => {
                return res.render('product-edit-form', {
                    Product,
                    errors: errors.mapped})
            })
            .catch(error => console.log(error));
        }
    },
    delete: function (req,res) {
        const PRODUCT_ID = req.params.id;

        Product.findByPk(PRODUCT_ID)
        .then(productToDelete => 
            res.render(
                "productDelete",
                {Product: producToDelete}

            ))
            .catch(error => console.log(error));
    },
    destroy: function (req,res) {
        const PRODUCT_ID = req.params.id;

        Product.destroy({
            where: {
                id: PRODUCT_ID
            }
        })
        .then(() =>{
            return res.redirect("/all-products")
        })
        .catch(error => console.log(error))
    }
}