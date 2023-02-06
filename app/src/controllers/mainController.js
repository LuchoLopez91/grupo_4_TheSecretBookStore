const fs = require("fs");
const path = require("path");

const booksPathDB = path.join(__dirname, "../database/books.json");
const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));

module.exports = {
    index: (req, res) => {
        res.render('home',{books});
    },
}