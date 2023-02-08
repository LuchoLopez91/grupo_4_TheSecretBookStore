const fs = require("fs");
const path = require("path");
const { title } = require("process");

const booksPathDB = path.join(__dirname, "../database/books.json");
const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));
const writeJSON = function (book) {
  fs.writeFileSync(booksPathDB, JSON.stringify(book), "utf-8");
};

module.exports = {
  product: (req, res) => {
    let book = books.find((book) => book.id == req.params.id);

    res.render("products/product", {
      book,
      link: "/css/product.css",
    });
  },
  

  create: (req, res) => {
    res.render("products/product-create-form", {
      doctitle: "Crear producto",
      link: "/css/product-create-form.css",
    });
  },

    store: (req, res) => {
        let lastId = products[products.length - 1].id;

        let newProduct = {
        id: lastId + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        editorial: req.body.editorial,
        languages: req.body.lenguages,
        format: req.body.format,
        genre: req.body.genre,
        description: req.body.description,
        image: "default-image.jpg",
        }
        products.push(newProduct);
        writeJson(products);
        res.redirect("/products/");
    },

    edit: (req, res) => {
      let bookToEdit = books.find((book) => book.id == req.params.id);
      res.render("products/product-edit-form.ejs", {
        bookToEdit,
        doctitle: bookToEdit.title,
        link: "/css/product-edit-form.css",
      });
    },
    update: (req, res) => {
        let productId = Number(req.params.id);

        products.forEach(product => {
            if(product.id === productId){
                product.name = req.body.title;
                product.autor = req.body.author;
                product.price = req.body.price;
                product.editorial = req.body.editorial;
                product.lenguages = req.body.lenguages;
                product.format = req.body.format;
                product.genre = req.body.genre;
                product.description = req.body.description;
            }
        });
        writeJson(products);
        res.send("Producto editado")
    },
  /* store: (req, res) => {
        res.send(req.body)
    }, */


};
