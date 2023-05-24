const fs = require("fs");
const path = require("path");

const booksPathDB = path.join(__dirname, "../database-old/books.json");
// const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));
const { Book, Format, Sequelize } = require("../database/models/");
const { Op } = Sequelize;

module.exports = {
    index: (req, res) => {
        const MOST_VISITED_PROMISE = Book.findAll(
            {
                attributes: ["id", "title", "price", "cover"],
                order: [["visits_count", "DESC"]],
                limit: 4,
            });
        const HARDBACK_PROMISE = Book.findAll(
            {
                attributes: ["id", "title", "price", "cover"],
                where: {format_id: 1},
                limit: 12,
            });
        const PAPERBACK_PROMISE = Book.findAll(
            {
                attributes: ["id", "title", "price", "cover"],
                where: {format_id: 2},
                limit: 12,
            });
        const DIGITAL_PROMISE = Book.findAll(
            {
                attributes: ["id", "title", "price", "cover"],
                where: {format_id: 3},
                limit: 12,
            });

        // const FORMAT_PROMISE = Format.findAll({ attributes: ["id", "format"] });

        Promise.all([
            MOST_VISITED_PROMISE,
            HARDBACK_PROMISE,
            PAPERBACK_PROMISE,
            DIGITAL_PROMISE,
            // FORMAT_PROMISE,
        ])
            .then((results) => {
                // const BOOKS = results
                const order = ["Más visitados", "Físicos de tapa dura", "Físicos de tapa blanda", "eBooks"];
                return res.render('home', {
                    session: req.session,
                    results,
                    order,
                    doctitle: "Home",
                    link: "/css/home.css"
                });
            })
            .catch(err => console.log(err));
    },

    search: (req, res) => {
        const { keywords } = req.query;
        Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.substring]: keywords } },
                    { author: { [Op.substring]: keywords } },
                ]
            }
        })
            .then((searchResults) => {
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