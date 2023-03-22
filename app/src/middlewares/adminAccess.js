const userDB = require('../database/users.json');

module.exports = (req, res, next) => userDB.inculdes(req.query.admin) ? next() : res.redirect('/home');