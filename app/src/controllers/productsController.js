const fs = require("fs");
const path = require("path");

const booksPathDB = path.join(__dirname, "../database/books.json");
const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));
const writeJSON = function (book) {
  fs.writeFileSync(booksPathDB, JSON.stringify(book), "utf-8");
};

module.exports = {
    product: (req, res) => {
        let book = books.find(book => book.id == req.params.id);

        res.render('products/product', {
            book,
            doctitle: "Producto",
            link: "/css/product.css"
        })
    },
    cart: (req, res) => {
        res.render('products/cart', {
        doctitle: "Mi carrito",
        link: "/css/cart.css"    
        })
    },
}