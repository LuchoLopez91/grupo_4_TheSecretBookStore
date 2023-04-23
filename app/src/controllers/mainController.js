const fs = require("fs");
const path = require("path");

const booksPathDB = path.join(__dirname, "../database-old/books.json");
const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));
const { Book, Sequelize } = require("../database/models/");
const { Op } = Sequelize;

module.exports = {
    index: (req, res) => {
        const HARDBACK_PROMISE = Book.findAll({
            where: {
                format_id: 0,
            },
        });
        const PAPERBACK_PROMISE = Book.findAll({
            where: {
                format_id: 1,
            },
        });
        const DIGITAL_PROMISE = Book.findAll({
            where: {
                format_id: 2,
            },
        });

        Promise.all([HARDBACK_PROMISE, PAPERBACK_PROMISE, DIGITAL_PROMISE])
        .then(([hardback, paperback, digital]) => {
            return res.render('home', {
                session: req.session,
                digital,
                paperback,
                hardback,
                doctitle: "Home",
                link: "/css/home.css"
            });
        })
        .catch(err => console.log(err));
    },

    search: (req, res) => {
        const { keywords } = req.query;
        //const results = books.filter((book) => book.title.toLowerCase().includes(keywords.toLowerCase()))
        Book.findAll({
            where: {
                title: {[Op.like]: `%${keywords}%`}
            }
        })
        .then((searchResults) => {
            // return res.send(searchResult);
            return res.render("results", {
                session: req.session,
                results: searchResults,
                doctitle: "Resultados de tu búsqueda",
                link: "/css/home.css",
            })
        })
        .catch(err => console.log(err));

    },

};