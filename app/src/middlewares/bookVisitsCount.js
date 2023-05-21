const { Book } = require("../database/models")

module.exports = async (req, res, next) => {
    let { id } = req.params;

    try {
        let visits = await Book.findByPk(id, { attribute: ["visits_count"] });
        let count = visits.visits_count++
        let updatedVisits = await Book.update({ visits_count: count }, {where: {id}});
        next();
    } catch (error) {
        console.error(error);
    };
};