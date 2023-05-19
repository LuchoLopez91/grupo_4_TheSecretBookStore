const fs = require("fs");
const path = require("path");

const booksPathDB = path.join(__dirname, "../database-old/books.json");
// const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));
const { Book, Sequelize } = require("../database/models/");
const { Op } = Sequelize;

module.exports = {
    index: (req, res) => {
        const MOST_VISITED_PROMISE = Book.findAll({
            order: [["visits_count","DESC"]],
            limit: 4,
        });
        const HARDBACK_PROMISE = Book.findAll({
            where: {
                format_id: 1,
            }});
        const PAPERBACK_PROMISE = Book.findAll({
            where: {
                format_id: 2,
            }});
        const DIGITAL_PROMISE = Book.findAll({
            where: {
                format_id: 3,
            }});

        Promise.all([MOST_VISITED_PROMISE, HARDBACK_PROMISE, PAPERBACK_PROMISE, DIGITAL_PROMISE])
        .then((results) => {
            const [
                MOST_VISITED_PROMISE,
                HARDBACK,
                PAPERBACK,
                DIGITAL,
            ] = results;
            // return res.send(PAPERBACK)
            return res.render('home', {
                session: req.session,
                MOST_VISITED_PROMISE,
                HARDBACK,
                PAPERBACK,
                DIGITAL,
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
                    {title: {[Op.substring]: keywords}},
                    {author: {[Op.substring]: keywords}},
                ]
            }})
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