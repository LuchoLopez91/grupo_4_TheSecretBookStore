const
    editorialsApiRouter = require("./editorialsApi"),
    genresApiRouter = require("./genresApi.js"),
    languagesApiRouter = require("./languagesApi.js"),
    usersApiRouter = require("./usersApi.js")

module.exports = [
    editorialsApiRouter,
    genresApiRouter,
    languagesApiRouter,
    usersApiRouter,
]