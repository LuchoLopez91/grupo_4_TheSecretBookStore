const fs = require("fs");
const path = require("path");

module.exports = {
    books: JSON.parse(fs.readFileSync(path.join(__dirname, "/books.json"), "utf-8")),
    genres: JSON.parse(fs.readFileSync(path.join(__dirname, "/genres.json"), "utf-8")),
    users: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8"))
}