const fs = require("fs");
const path = require("path");

const booksPathDB = path.join(__dirname, "../database-old/books.json");
const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));

module.exports = {
    index: (req, res) => {
        let digital = books.filter(libro => libro.format == 'Digital');
        let paperback = books.filter(libro => libro.format == 'Físico');
        res.render('home', {
            session: req.session,
            books,
            digital,
            paperback,
            doctitle: "Home",
            link: "/css/home.css"
        });
    },
    search: (req, res) => {
        const { keywords } = req.query;
        const results = books.filter((book) => book.title.toLowerCase().includes(keywords.toLowerCase()))

        res.render("results", {
            session: req.session,
            results,
            doctitle: "Resultados de tu búsqueda",
            link: "/css/home.css",
        })
    },

};